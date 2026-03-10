import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Loader2, AlertCircle, Sparkles } from 'lucide-react'
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
  const [added, setAdded] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [barcode])

  async function loadProduct() {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const { data: cached } = await supabase
        .from('scan_cache')
        .select('*')
        .eq('barcode', barcode)
        .single()

      const prod = await fetchProductByBarcode(barcode)
      setProduct(prod)

      const pre = analyzeIngredients(prod.ingredients_text)
      setPreAnalysis(pre)

      if (cached?.analysis) {
        setAiAnalysis(cached.analysis)
      } else {
        // Run AI analysis in background
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

      // Cache the result
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
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { navigate('/auth'); return }

    const calories = Math.round(product?.nutriments?.['energy-kcal_100g'] || 0)
    await supabase.from('calorie_logs').insert({
      user_id: user.id,
      date: new Date().toISOString().split('T')[0],
      barcode,
      product_name: product?.product_name || 'Unknown',
      calories,
      servings: 1,
    })
    setAdded(true)
  }

  const score = aiAnalysis?.health_score || preAnalysis?.score || 'unknown'
  const flagged = aiAnalysis?.flagged_ingredients || preAnalysis?.flagged || []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={32} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-4">
        <AlertCircle className="text-red-500" size={40} />
        <p className="text-gray-700 text-center">{error}</p>
        <button onClick={() => navigate('/scan')} className="text-green-600 font-semibold">
          ← Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Top bar */}
      <div className="bg-white px-4 pt-14 pb-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-gray-900 flex-1 truncate text-sm">
          {product?.product_name || 'Product'}
        </h1>
        <HealthScore score={score} size="sm" />
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Product header */}
        <div className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-gray-50">
          {product?.image_url ? (
            <img src={product.image_url} alt="" className="w-20 h-20 object-contain rounded-xl bg-gray-50 shrink-0" />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-xl shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900">{product?.product_name}</p>
            <p className="text-gray-500 text-sm">{product?.brands}</p>
            <div className="mt-2">
              <HealthScore score={score} size="md" />
            </div>
          </div>
        </div>

        {/* AI Summary */}
        {aiLoading && (
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex items-center gap-3">
            <Loader2 className="animate-spin text-purple-500 shrink-0" size={16} />
            <p className="text-purple-700 text-sm">AI is analyzing ingredients...</p>
          </div>
        )}

        {aiAnalysis?.summary && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-purple-700 text-xs font-bold uppercase tracking-wide">AI Verdict</span>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">{aiAnalysis.summary}</p>
          </div>
        )}

        {/* Flagged Ingredients */}
        {flagged.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              {flagged.length} Concerning Ingredient{flagged.length !== 1 ? 's' : ''}
            </h2>
            <div className="space-y-2">
              {flagged.map((ing, i) => (
                <IngredientFlag key={i} ingredient={ing} />
              ))}
            </div>
          </div>
        )}

        {/* Good aspects */}
        {aiAnalysis?.good_aspects?.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
            <h2 className="font-bold text-gray-900 mb-3 text-green-700">✓ Good Aspects</h2>
            <ul className="space-y-1">
              {aiAnalysis.good_aspects.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-green-500">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Better Alternatives */}
        {aiAnalysis?.alternatives?.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
            <h2 className="font-bold text-gray-900 mb-3">Better Alternatives</h2>
            <div className="space-y-2">
              {aiAnalysis.alternatives.map((alt, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-3">
                  <p className="font-semibold text-green-900 text-sm">{alt.name || alt}</p>
                  {alt.reason && <p className="text-green-700 text-xs mt-0.5">{alt.reason}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition */}
        <NutritionCard nutriments={product?.nutriments} />

        {/* Full Ingredients */}
        {product?.ingredients_text && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
            <h2 className="font-bold text-gray-900 mb-2 text-sm">Full Ingredients</h2>
            <p className="text-gray-500 text-xs leading-relaxed">{product.ingredients_text}</p>
          </div>
        )}
      </div>

      {/* Add to Tracker CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4">
        <button
          onClick={addToTracker}
          disabled={added}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold shadow-lg transition-all ${
            added
              ? 'bg-gray-200 text-gray-500'
              : 'bg-green-600 text-white shadow-green-200 active:bg-green-700'
          }`}
        >
          <Plus size={18} />
          {added ? 'Added to Tracker ✓' : 'Add to Daily Tracker'}
        </button>
      </div>
    </div>
  )
}
