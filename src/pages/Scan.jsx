import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { Search, ScanLine, X, Loader2, Zap } from 'lucide-react'
import { searchProducts } from '../lib/openFoodFacts'

export default function Scan() {
  const [mode, setMode] = useState('scan')
  const [scanning, setScanning] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const scannerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (mode === 'scan') {
      startScanner()
    } else {
      stopScanner()
    }
    return () => stopScanner()
  }, [mode])

  async function startScanner() {
    try {
      setError(null)
      setScanning(true)
      const html5QrCode = new Html5Qrcode('reader')
      scannerRef.current = html5QrCode
      await html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 240, height: 140 } },
        (decodedText) => {
          stopScanner()
          navigate(`/product/${decodedText}`)
        },
        () => {}
      )
    } catch {
      setError('Camera access denied. Please allow camera access or use search.')
      setScanning(false)
    }
  }

  async function stopScanner() {
    if (scannerRef.current) {
      try { await scannerRef.current.stop() } catch {}
      scannerRef.current = null
    }
    setScanning(false)
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    try {
      const products = await searchProducts(query)
      setResults(products)
    } catch {
      setError('Search failed. Try again.')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: '#07070f' }}>
      {/* Header */}
      <div className="pt-14 px-5 pb-4">
        <h1 className="text-white text-2xl font-black mb-1">Scan Product</h1>
        <p className="text-white/40 text-sm">Point at a barcode or search by name</p>
      </div>

      {/* Mode Toggle */}
      <div className="px-5 mb-5">
        <div className="flex p-1 rounded-2xl" style={{ background: '#111827' }}>
          <button
            onClick={() => setMode('scan')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
              mode === 'scan'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-white/40'
            }`}
          >
            <ScanLine size={15} />
            Scan Barcode
          </button>
          <button
            onClick={() => setMode('search')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
              mode === 'search'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-white/40'
            }`}
          >
            <Search size={15} />
            Search
          </button>
        </div>
      </div>

      {mode === 'scan' ? (
        <div className="px-5">
          {error ? (
            <div className="rounded-3xl p-6 text-center border border-red-500/20"
              style={{ background: 'rgba(239,68,68,0.08)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(239,68,68,0.15)' }}>
                <X size={20} className="text-red-400" />
              </div>
              <p className="text-red-300 text-sm mb-4 leading-relaxed">{error}</p>
              <button
                onClick={() => setMode('search')}
                className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl"
              >
                Switch to Search
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Scanner container */}
              <div className="rounded-3xl overflow-hidden border border-white/5"
                style={{ background: '#111827' }}>
                <div id="reader" className="rounded-3xl overflow-hidden" />
                {!scanning && !error && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-3xl"
                    style={{ background: '#111827' }}>
                    <div className="text-center">
                      <Loader2 className="animate-spin text-blue-400 mx-auto mb-3" size={28} />
                      <p className="text-white/40 text-sm">Starting camera...</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Tip */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <Zap size={13} className="text-blue-400" />
                <p className="text-white/40 text-xs">Point camera at any product barcode</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="px-5">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="flex-1 rounded-2xl flex items-center gap-2 px-4 border border-white/5"
              style={{ background: '#111827' }}>
              <Search size={15} className="text-white/30 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search product name..."
                className="flex-1 bg-transparent text-white text-sm py-4 outline-none placeholder-white/25"
                autoFocus
              />
              {query && (
                <button type="button" onClick={() => setQuery('')}>
                  <X size={13} className="text-white/30" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 rounded-2xl font-bold text-sm flex items-center justify-center min-w-[60px] active:bg-blue-700 transition-colors"
            >
              {searching ? <Loader2 size={15} className="animate-spin" /> : 'Go'}
            </button>
          </form>

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map(product => (
                <button
                  key={product.code}
                  onClick={() => navigate(`/product/${product.code}`)}
                  className="w-full rounded-2xl p-3.5 flex items-center gap-3 text-left border border-white/5 active:scale-98 transition-all"
                  style={{ background: '#111827' }}
                >
                  {product.image_url ? (
                    <img src={product.image_url} alt="" className="w-13 h-13 rounded-xl object-cover shrink-0"
                      style={{ width: 52, height: 52, background: '#1f2937' }} />
                  ) : (
                    <div className="rounded-xl shrink-0 flex items-center justify-center"
                      style={{ width: 52, height: 52, background: '#1f2937' }}>
                      <ScanLine size={20} className="text-white/20" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold text-sm truncate">{product.product_name || 'Unknown Product'}</p>
                    <p className="text-white/40 text-xs truncate mt-0.5">{product.brands || 'Unknown brand'}</p>
                  </div>
                  <div className="shrink-0 w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(59,130,246,0.12)' }}>
                    <X size={10} className="text-blue-400 rotate-45" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {results.length === 0 && query && !searching && (
            <div className="text-center py-12">
              <Search size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
