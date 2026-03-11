import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2, Clock, ChevronRight, ScanLine, LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'
import HealthScore from '../components/HealthScore'

export default function History() {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      loadHistory(session?.user ?? null)
    })
  }, [])

  async function loadHistory(currentUser) {
    if (currentUser) {
      // Logged in — show their personal scan history
      const { data } = await supabase
        .from('user_scans')
        .select('barcode, product_name, health_score, scanned_at')
        .eq('user_id', currentUser.id)
        .order('scanned_at', { ascending: false })
        .limit(100)
      setScans(data || [])
    } else {
      // Not logged in — show global cache (limited)
      const { data } = await supabase
        .from('scan_cache')
        .select('barcode, product_name, health_score, created_at')
        .order('created_at', { ascending: false })
        .limit(20)
      setScans((data || []).map(s => ({ ...s, scanned_at: s.created_at })))
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#07070f' }}>
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28 pt-14" style={{ background: '#07070f' }}>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-black text-2xl text-white">History</h1>
          <span className="text-white/30 text-xs">{scans.length} scans</span>
        </div>

        {/* Sign-in nudge when not logged in */}
        {!user && (
          <Link to="/auth"
            className="flex items-center gap-3 rounded-2xl p-4 mb-4 border border-blue-500/20"
            style={{ background: 'rgba(59,130,246,0.08)' }}>
            <LogIn size={16} className="text-blue-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-blue-300 text-sm font-semibold">Sign in to save your history</p>
              <p className="text-blue-400/50 text-xs">Your scans will be tied to your account</p>
            </div>
            <ChevronRight size={14} className="text-blue-400/40 shrink-0" />
          </Link>
        )}

        {scans.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <ScanLine size={24} className="text-white/20" />
            </div>
            <p className="text-white/30 text-sm mb-4">No scans yet</p>
            <button onClick={() => navigate('/scan')}
              className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-2xl">
              Scan Your First Product
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {scans.map(scan => (
              <button
                key={scan.barcode + scan.scanned_at}
                onClick={() => navigate(`/product/${scan.barcode}`)}
                className="w-full rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5 active:scale-98 transition-all"
                style={{ background: '#111827' }}
              >
                <HealthScore score={scan.health_score || 'unknown'} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{scan.product_name || scan.barcode}</p>
                  <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1">
                    <Clock size={10} />
                    {new Date(scan.scanned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <ChevronRight size={15} className="text-white/20 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
