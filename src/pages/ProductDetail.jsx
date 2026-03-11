import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Loader2, AlertCircle, Sparkles, CheckCircle2, XCircle } from 'lucide-react'
import { fetchProductByBarcode } from '../lib/openFoodFacts'
import { analyzeIngredients } from '../lib/ingredientAnalysis'
import { analyzeWithClaude } from '../lib/claudeAPI'
import { supabase } from '../lib/supabase'
import HealthScore from '../components/HealthScore'
import IngredientFlag from '../components/IngredientFlag'
import NutritionCard from '../components/NutritionCard'

export default function ProductDetail() {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [preAnalysis, setPreAnalysis] = useState(null)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiLoading, setAiLoading] = useState(false)
  const [error, setError] = useState(null)
  const [trackerStatus, setTrackerStatus] = useState('idle') // idle | loading | success | error
  const [trackerError, setTrackerError] = useState(null)

  useEffect(() => {
    loadProduct()
  }, [barcode])

  async function loadProduct() {
    try {
      setLoading(true)
      setError(null)

      // Check cache first — avoids re-using AI credits
      const { data: cached } = await supabase
        .from('scan_cache')
        .select('*')
        .eq('barcode', barcode)
        .single()

      const prod = await fetchProductByBarcode(barcode)
      setProduct(prod)

      const pre = analyzeIngredients(prod.ingredients_text)
      setPreAnalysis(pre)

      // Write to scan_cache immediately so History shows this scan right away
      await supabase.from('scan_cache').upsert({
        barcode,
        product_name: prod.product_name || 'Unknown Product',
        health_score: cached?.health_score || pre.score || 'unknown',
        analysis: cached?.analysis || null,
      })

      // Record this scan under the user's account (if logged in)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('user_scans').upsert({
          user_id: user.id,
          barcode,
          product_name: prod.product_name || 'Unknown Product',
          health_score: cached?.health_score || pre.score || 'unknown',
          scanned_at: new Date().toISOString(),
        }, { onConflict: 'user_id,barcode' })
      }

      if (cached?.analysis) {
        setAiAnalysis(cached.analysis)
      } else {
        runAIAnalysis(prod, pre)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function runAIAnalysis(prod, pre) {
    if (!prod.ingredients_text) return
    setAiLoading(true)
    try {
      const analysis = await analyzeWithClaude(
        prod.product_name || 'Unknown Product',
        prod.ingredients_text,
        pre
      )
      setAiAnalysis(analysis)

      // Update cache with full AI result
      await supabase.from('scan_cache').upsert({
        barcode,
        product_name: prod.product_name,
        health_score: analysis.health_score,
        analysis,
      })
    } catch (err) {
      console.error('AI analysis failed:', err)
    } finally {
      setAiLoading(false)
    }
  }

  async function addToTracker() {
    setTrackerStatus('loading')
    setTrackerError(null)

    try {
      const { data: { user }, error: authErr } = await supabase.auth.getUser()

      if (authErr || !user) {
        navigate('/auth')
        return
      }

      const calories = Math.round(product?.nutriments?.['energy-kcal_100g'] || 0)

      const { error: insertErr } = await supabase.from('calorie_logs').insert({
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
        barcode,
        product_name: product?.product_name || 'Unknown',
        calories,
        servings: 1,
      })

      if (insertErr) {
        console.error('Tracker insert error:', insertErr)
        setTrackerError(insertErr.message)
        setTrackerStatus('error')
        return
      }

      setTrackerStatus('success')
    } catch (err) {
      console.error('Tracker error:', err)
      setTrackerError(err.message)
      setTrackerStatus('error')
    }
  }

  const score = aiAnalysis?.health_score || preAnalysis?.score || 'unknown'
  const flagged = aiAnalysis?.flagged_ingredients || preAnalysis?.flagged || []

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#07070f' }}>
        <div className="w-16 h-16 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
        <p className="text-white/40 text-sm">Loading product...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-4" style={{ background: '#07070f' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(239,68,68,0.12)' }}>
          <AlertCircle className="text-red-400" size={28} />
        </div>
        <p className="text-white/60 text-center text-sm">{error}</p>
        <button onClick={() => navigate('/scan')}
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl text-sm">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-32" style={{ background: '#07070f' }}>
      {/* Top bar */}
      <div className="px-4 pt-14 pb-4 flex items-center gap-3 border-b border-white/5"
        style={{ background: '#07070f' }}>
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10"
          style={{ background: '#111827' }}>
          <ArrowLeft size={17} className="text-white" />
        </button>
        <h1 className="font-bold text-white flex-1 truncate text-sm">
          {product?.product_name || 'Product'}
        </h1>
        <HealthScore score={score} size="sm" />
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Product card */}
        <div className="rounded-3xl p-4 flex gap-4 items-center border border-white/5"
          style={{ background: '#111827' }}>
          {product?.image_url ? (
            <img src={product.image_url} alt="" className="w-20 h-20 object-contain rounded-2xl shrink-0"
              style={{ background: '#1f2937' }} />
          ) : (
            <div className="w-20 h-20 rounded-2xl shrink-0" style={{ background: '#1f2937' }} />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-base leading-snug">{product?.product_name}</p>
            <p className="text-white/40 text-xs mt-0.5 mb-3">{product?.brands}</p>
            <HealthScore score={score} size="md" />
          </div>
        </div>

        {/* AI Loading */}
        {aiLoading && (
          <div className="rounded-2xl p-4 flex items-center gap-3 border border-blue-500/20"
            style={{ background: 'rgba(59,130,246,0.08)' }}>
            <Loader2 className="animate-spin text-blue-400 shrink-0" size={16} />
            <div>
              <p className="text-blue-300 text-sm font-semibold">AI analyzing ingredients...</p>
              <p className="text-blue-400/60 text-xs">This takes about 5 seconds</p>
            </div>
          </div>
        )}

        {/* AI Summary */}
        {aiAnalysis?.summary && (
          <div className="rounded-3xl p-4 border border-blue-500/15"
            style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.2) 0%, rgba(99,102,241,0.1) 100%)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={13} className="text-blue-400" />
              <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">AI Verdict</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{aiAnalysis.summary}</p>
          </div>
        )}

        {/* Flagged Ingredients */}
        {flagged.length > 0 && (
          <div className="rounded-3xl p-4 border border-white/5" style={{ background: '#111827' }}>
            <h2 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
              <AlertCircle size={15} className="text-red-400" />
              {flagged.length} Concerning Ingredient{flagged.length !== 1 ? 's' : ''}
            </h2>
            <div className="space-y-2">
              {flagged.map((ing, i) => (
                <IngredientFlag key={i} ingredient={ing} />
              ))}
            </div>
          </div>
        )}

        {/* Good Aspects */}
        {aiAnalysis?.good_aspects?.length > 0 && (
          <div className="rounded-3xl p-4 border border-emerald-500/15"
            style={{ background: 'rgba(16,185,129,0.06)' }}>
            <h2 className="font-bold text-emerald-400 mb-3 text-sm flex items-center gap-2">
              <CheckCircle2 size={15} />
              Good Aspects
            </h2>
            <ul className="space-y-1.5">
              {aiAnalysis.good_aspects.map((item, i) => (
                <li key={i} className="text-sm text-white/60 flex gap-2">
                  <span className="text-emerald-400 shrink-0">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Better Alternatives */}
        {aiAnalysis?.alternatives?.length > 0 && (
          <div className="rounded-3xl p-4 border border-white/5" style={{ background: '#111827' }}>
            <h2 className="font-bold text-white mb-3 text-sm">Better Alternatives</h2>
            <div className="space-y-2">
              {aiAnalysis.alternatives.map((alt, i) => (
                <div key={i} className="rounded-2xl p-3 border border-blue-500/15"
                  style={{ background: 'rgba(59,130,246,0.08)' }}>
                  <p className="font-semibold text-blue-200 text-sm">{alt.name || alt}</p>
                  {alt.reason && <p className="text-blue-400/70 text-xs mt-0.5">{alt.reason}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition */}
        <NutritionCard nutriments={product?.nutriments} />

        {/* Full Ingredients */}
        {product?.ingredients_text && (
          <div className="rounded-3xl p-4 border border-white/5" style={{ background: '#111827' }}>
            <h2 className="font-bold text-white mb-2 text-sm">Full Ingredients</h2>
            <p className="text-white/30 text-xs leading-relaxed">{product.ingredients_text}</p>
          </div>
        )}
      </div>

      {/* Add to Tracker CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40 space-y-2">
        {/* Error message */}
        {trackerStatus === 'error' && (
          <div className="rounded-2xl p-3 flex items-center gap-2 border border-red-500/20"
            style={{ background: 'rgba(239,68,68,0.1)' }}>
            <XCircle size={14} className="text-red-400 shrink-0" />
            <p className="text-red-300 text-xs leading-snug">
              {trackerError?.includes('does not exist')
                ? 'Database table missing — run the SQL setup in Supabase first.'
                : trackerError || 'Failed to add to tracker. Are you signed in?'}
            </p>
          </div>
        )}

        <button
          onClick={addToTracker}
          disabled={trackerStatus === 'success' || trackerStatus === 'loading'}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm shadow-2xl transition-all ${
            trackerStatus === 'success'
              ? 'text-white/30'
              : trackerStatus === 'loading'
              ? 'bg-blue-600/50 text-white/50'
              : 'bg-blue-600 text-white active:scale-98'
          }`}
          style={trackerStatus === 'success' ? { background: '#111827', border: '1px solid rgba(255,255,255,0.08)' } : {}}
        >
          {trackerStatus === 'loading' ? (
            <><Loader2 size={17} className="animate-spin" /> Adding...</>
          ) : trackerStatus === 'success' ? (
            <><CheckCircle2 size={17} className="text-emerald-400" /> Added to Tracker</>
          ) : (
            <><Plus size={17} /> Add to Daily Tracker</>
          )}
        </button>
      </div>
    </div>
  )
}
