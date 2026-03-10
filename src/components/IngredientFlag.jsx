const severityConfig = {
  high: { bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
  medium: { bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-400', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  low: { bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
}

export default function IngredientFlag({ ingredient }) {
  const config = severityConfig[ingredient.severity] || severityConfig.low

  return (
    <div className={`${config.bg} ${config.border} border rounded-xl p-3 flex gap-3 items-start`}>
      <div className={`${config.dot} w-2.5 h-2.5 rounded-full mt-1 shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 text-sm">{ingredient.name}</span>
          {ingredient.category && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.badge}`}>
              {ingredient.category}
            </span>
          )}
        </div>
        <p className={`text-xs mt-0.5 ${config.text}`}>{ingredient.reason}</p>
      </div>
    </div>
  )
}
