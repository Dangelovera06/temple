import { Link, useLocation } from 'react-router-dom'
import { ScanLine, BarChart3, Clock, Home } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/tracker', icon: BarChart3, label: 'Tracker' },
  { to: null, icon: ScanLine, label: 'Scan', isScan: true },
  { to: '/history', icon: Clock, label: 'History' },
  { to: '/auth', icon: null, label: 'Profile', isProfile: true },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(7,7,15,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}>
      <div className="flex max-w-md mx-auto px-2 py-2 items-end">
        {navItems.map(({ to, icon: Icon, label, isScan, isProfile }) => {
          if (isScan) {
            return (
              <Link
                key="scan"
                to="/scan"
                className="flex-1 flex flex-col items-center -mt-6"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    boxShadow: '0 8px 32px rgba(59,130,246,0.4)',
                  }}>
                  <ScanLine size={24} className="text-white" strokeWidth={2} />
                </div>
                <span className="text-[10px] font-semibold mt-1.5 text-blue-400">{label}</span>
              </Link>
            )
          }

          if (isProfile) {
            const active = pathname === '/auth'
            return (
              <Link key="profile" to="/auth"
                className={`flex-1 flex flex-col items-center py-1 gap-0.5 transition-colors ${active ? 'text-blue-400' : 'text-white/25'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${active ? 'border-blue-400 bg-blue-400/10' : 'border-white/10'}`}>
                  P
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            )
          }

          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center py-1 gap-0.5 transition-colors ${active ? 'text-blue-400' : 'text-white/25'}`}
            >
              <Icon size={21} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
