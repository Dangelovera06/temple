import { Link } from 'react-router-dom'
import { ScanLine, Leaf, BarChart3, ShieldCheck, ChevronRight } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Home() {
  return (
    <div className="min-h-screen pb-28" style={{ background: '#07070f' }}>
      {/* Header */}
      <div className="pt-14 pb-6 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-1">Welcome back</p>
            <h1 className="text-white text-2xl font-black">Temple AI</h1>
          </div>
          <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white/10"
            style={{ background: '#111827' }}>
            <img src={logo} alt="Temple" className="w-full h-full object-contain p-1" />
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative rounded-3xl overflow-hidden p-6 mb-6"
          style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 50%, #0f172a 100%)' }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #60a5fa, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="relative z-10">
            <p className="text-blue-200 text-xs font-semibold tracking-wider uppercase mb-2">Know what you eat</p>
            <h2 className="text-white text-2xl font-black leading-tight mb-4">
              Scan. Analyze.<br />Eat Better.
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed mb-5 max-w-[220px]">
              Instantly know what's really in your food — hidden oils, harmful additives, and smarter choices.
            </p>
            <Link
              to="/scan"
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold text-sm px-5 py-3 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              <ScanLine size={16} />
              Scan a Product
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">Quick Access</p>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/tracker"
            className="rounded-2xl p-4 border border-white/5 flex flex-col gap-3 active:scale-95 transition-transform"
            style={{ background: '#111827' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.15)' }}>
              <BarChart3 size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Tracker</p>
              <p className="text-white/40 text-xs">Daily calories</p>
            </div>
          </Link>
          <Link to="/history"
            className="rounded-2xl p-4 border border-white/5 flex flex-col gap-3 active:scale-95 transition-transform"
            style={{ background: '#111827' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.15)' }}>
              <ShieldCheck size={18} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">History</p>
              <p className="text-white/40 text-xs">Past scans</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="px-6">
        <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">What We Analyze</p>
        <div className="space-y-2">
          {[
            {
              icon: ShieldCheck,
              color: 'text-blue-400',
              bg: 'rgba(59,130,246,0.12)',
              title: 'Ingredient Truth',
              desc: 'Flag seed oils, artificial additives, preservatives, and 30+ harmful ingredients',
            },
            {
              icon: Leaf,
              color: 'text-emerald-400',
              bg: 'rgba(52,211,153,0.12)',
              title: 'Better Alternatives',
              desc: 'AI-powered suggestions for cleaner, healthier products',
            },
            {
              icon: BarChart3,
              color: 'text-violet-400',
              bg: 'rgba(167,139,250,0.12)',
              title: 'Calorie Tracking',
              desc: 'Log daily intake with accurate nutrition data from any product',
            },
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title}
              className="flex gap-4 items-center rounded-2xl p-4 border border-white/5"
              style={{ background: '#111827' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: bg }}>
                <Icon size={18} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">{title}</p>
                <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <ChevronRight size={14} className="text-white/20 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
