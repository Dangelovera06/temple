import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Clock, ScanLine, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import HealthScore from '../components/HealthScore'

export default function History() {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    const { data } = await supabase
      .from('scan_cache')
      .select('barcode, product_name, health_score, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
    setScans(data || [])
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
          <h1 className="font-black text-2xl text-white">Scan History</h1>
          <span className="text-white/30 text-xs">{scans.length} scans</span>
        </div>

        {scans.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <Clock size={24} className="text-white/20" />
            </div>
            <p className="text-white/30 text-sm mb-3">No scans yet</p>
            <button onClick={() => navigate('/scan')}
              className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-2xl">
              Scan Your First Product
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {scans.map(scan => (
              <button
                key={scan.barcode}
                onClick={() => navigate(`/product/${scan.barcode}`)}
                className="w-full rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5 active:scale-98 transition-all"
                style={{ background: '#111827' }}
              >
                <HealthScore score={scan.health_score || 'unknown'} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{scan.product_name || scan.barcode}</p>
                  <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1">
                    <Clock size={10} />
                    {new Date(scan.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
