import { Link, useLocation } from 'react-router-dom'
import { ScanLine, BarChart3, Clock, Home } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/scan', icon: ScanLine, label: 'Scan' },
  { to: '/tracker', icon: BarChart3, label: 'Tracker' },
  { to: '/history', icon: Clock, label: 'History' },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-inset-bottom z-50">
      <div className="flex max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${
                active ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
