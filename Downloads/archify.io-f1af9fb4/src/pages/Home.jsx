import { Link } from 'react-router-dom'
import { ScanLine, Leaf, BarChart3, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24">
      {/* Header */}
      <div className="pt-14 pb-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Leaf size={12} />
          Know what you eat
        </div>
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">
          Scan. Analyze.<br />
          <span className="text-green-600">Eat Better.</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
          Instantly know what's really in your food — hidden oils, harmful additives, and smarter alternatives.
        </p>
      </div>

      {/* Main CTA */}
      <div className="px-6 mb-8">
        <Link
          to="/scan"
          className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-green-200 transition-all"
        >
          <ScanLine size={24} />
          Scan a Product
        </Link>
      </div>

      {/* Features */}
      <div className="px-6 space-y-3">
        {[
          {
            icon: ShieldCheck,
            color: 'text-green-600 bg-green-50',
            title: 'Ingredient Truth',
            desc: 'Flag seed oils, artificial additives, preservatives, and more',
          },
          {
            icon: Leaf,
            color: 'text-emerald-600 bg-emerald-50',
            title: 'Better Alternatives',
            desc: 'AI-powered suggestions for cleaner products',
          },
          {
            icon: BarChart3,
            color: 'text-blue-600 bg-blue-50',
            title: 'Calorie Tracking',
            desc: 'Log your daily intake with accurate nutritional data',
          },
        ].map(({ icon: Icon, color, title, desc }) => (
          <div key={title} className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
            <div className={`${color} p-3 rounded-xl shrink-0`}>
              <Icon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
