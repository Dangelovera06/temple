const scoreConfig = {
  A: { color: 'bg-green-500', text: 'text-white', label: 'Excellent', desc: 'Clean ingredients' },
  B: { color: 'bg-lime-500', text: 'text-white', label: 'Good', desc: 'Mostly clean' },
  C: { color: 'bg-yellow-400', text: 'text-gray-900', label: 'Fair', desc: 'Some concerns' },
  D: { color: 'bg-orange-500', text: 'text-white', label: 'Poor', desc: 'Several harmful ingredients' },
  E: { color: 'bg-red-600', text: 'text-white', label: 'Avoid', desc: 'Very harmful ingredients' },
  unknown: { color: 'bg-gray-400', text: 'text-white', label: '?', desc: 'Unknown' },
}

export default function HealthScore({ score, size = 'md' }) {
  const config = scoreConfig[score] || scoreConfig.unknown
  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${sizes[size]} ${config.color} ${config.text} rounded-xl flex items-center justify-center font-black shadow-lg`}>
        {score === 'unknown' ? '?' : score}
      </div>
      <span className="text-xs font-semibold text-gray-600">{config.label}</span>
    </div>
  )
}
