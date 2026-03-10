import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Scan from './pages/Scan'
import ProductDetail from './pages/ProductDetail'
import Tracker from './pages/Tracker'
import History from './pages/History'
import Auth from './pages/Auth'
import BottomNav from './components/BottomNav'

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/product/:barcode" element={<ProductDetail />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/history" element={<History />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
