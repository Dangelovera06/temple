import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Clock } from 'lucide-react'
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
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-green-600" size={32} /></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28 pt-14">
      <div className="px-4 py-4">
        <h1 className="font-black text-2xl text-gray-900 mb-4">Scan History</h1>

        {scans.length === 0 ? (
          <div className="text-center py-16">
            <Clock size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No scans yet</p>
            <button onClick={() => navigate('/scan')} className="mt-3 text-green-600 font-semibold text-sm">
              Scan your first product →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {scans.map(scan => (
              <button
                key={scan.barcode}
                onClick={() => navigate(`/product/${scan.barcode}`)}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-50 text-left"
              >
                <HealthScore score={scan.health_score || 'unknown'} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{scan.product_name || scan.barcode}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {new Date(scan.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
