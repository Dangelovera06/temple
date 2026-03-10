import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { Search, ScanLine, X, Loader2 } from 'lucide-react'
import { searchProducts } from '../lib/openFoodFacts'

export default function Scan() {
  const [mode, setMode] = useState('scan') // 'scan' | 'search'
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
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
          stopScanner()
          navigate(`/product/${decodedText}`)
        },
        () => {}
      )
    } catch (err) {
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
    <div className="min-h-screen bg-gray-950 pb-24">
      {/* Mode Toggle */}
      <div className="flex p-4 gap-2 pt-14">
        <button
          onClick={() => setMode('scan')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
            mode === 'scan' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          <ScanLine size={16} />
          Scan Barcode
        </button>
        <button
          onClick={() => setMode('search')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
            mode === 'search' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
          }`}
        >
          <Search size={16} />
          Search
        </button>
      </div>

      {mode === 'scan' ? (
        <div className="px-4">
          {error ? (
            <div className="bg-red-900/30 border border-red-700 rounded-2xl p-4 text-center">
              <p className="text-red-300 text-sm">{error}</p>
              <button
                onClick={() => setMode('search')}
                className="mt-3 text-green-400 text-sm font-semibold"
              >
                Switch to Search →
              </button>
            </div>
          ) : (
            <div className="relative">
              <div id="reader" className="rounded-2xl overflow-hidden" />
              {!scanning && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="animate-spin text-green-400" size={32} />
                </div>
              )}
              <p className="text-center text-gray-400 text-sm mt-4">
                Point camera at a barcode
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="px-4">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="flex-1 bg-gray-800 rounded-xl flex items-center gap-2 px-4">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search product name..."
                className="flex-1 bg-transparent text-white text-sm py-3.5 outline-none placeholder-gray-500"
                autoFocus
              />
              {query && (
                <button type="button" onClick={() => setQuery('')}>
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 rounded-xl font-semibold text-sm"
            >
              {searching ? <Loader2 size={16} className="animate-spin" /> : 'Go'}
            </button>
          </form>

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map(product => (
                <button
                  key={product.code}
                  onClick={() => navigate(`/product/${product.code}`)}
                  className="w-full bg-gray-800 rounded-2xl p-3 flex items-center gap-3 text-left hover:bg-gray-700 transition-colors"
                >
                  {product.image_url ? (
                    <img src={product.image_url} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-700 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-700 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{product.product_name || 'Unknown Product'}</p>
                    <p className="text-gray-400 text-xs truncate">{product.brands}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
