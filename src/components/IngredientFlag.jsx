const severityConfig = {
  high: {
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
    dot: '#ef4444',
    name: '#fca5a5',
    badge: { bg: 'rgba(239,68,68,0.15)', text: '#f87171' },
    reason: 'rgba(239,68,68,0.7)',
  },
  medium: {
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
    dot: '#f97316',
    name: '#fdba74',
    badge: { bg: 'rgba(249,115,22,0.15)', text: '#fb923c' },
    reason: 'rgba(249,115,22,0.7)',
  },
  low: {
    bg: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.2)',
    dot: '#eab308',
    name: '#fde047',
    badge: { bg: 'rgba(234,179,8,0.15)', text: '#facc15' },
    reason: 'rgba(234,179,8,0.7)',
  },
}

export default function IngredientFlag({ ingredient }) {
  const config = severityConfig[ingredient.severity] || severityConfig.low

  return (
    <div style={{
      background: config.bg,
      border: `1px solid ${config.border}`,
      borderRadius: 14,
      padding: '10px 12px',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: config.dot,
        marginTop: 4,
        flexShrink: 0,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, color: config.name, fontSize: 13 }}>{ingredient.name}</span>
          {ingredient.category && (
            <span style={{
              fontSize: 10,
              padding: '2px 7px',
              borderRadius: 20,
              fontWeight: 600,
              background: config.badge.bg,
              color: config.badge.text,
            }}>
              {ingredient.category}
            </span>
          )}
        </div>
        <p style={{ fontSize: 11, marginTop: 2, color: config.reason, lineHeight: 1.4 }}>{ingredient.reason}</p>
      </div>
    </div>
  )
}
