const scoreConfig = {
  A: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', text: '#10b981', label: 'Excellent' },
  B: { bg: 'rgba(132,204,22,0.15)', border: 'rgba(132,204,22,0.4)', text: '#84cc16', label: 'Good' },
  C: { bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.4)', text: '#eab308', label: 'Fair' },
  D: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)', text: '#f97316', label: 'Poor' },
  E: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#ef4444', label: 'Avoid' },
  unknown: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#6b7280', label: '?' },
}

export default function HealthScore({ score, size = 'md' }) {
  const config = scoreConfig[score] || scoreConfig.unknown
  const sizes = {
    sm: { box: 36, font: 16, label: false },
    md: { box: 56, font: 26, label: true },
    lg: { box: 80, font: 40, label: true },
  }
  const s = sizes[size]

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        style={{
          width: s.box,
          height: s.box,
          borderRadius: 12,
          background: config.bg,
          border: `1.5px solid ${config.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: s.font,
          fontWeight: 900,
          color: config.text,
          letterSpacing: '-0.02em',
        }}
      >
        {score === 'unknown' ? '?' : score}
      </div>
      {s.label && (
        <span className="text-xs font-semibold" style={{ color: config.text, opacity: 0.8 }}>
          {config.label}
        </span>
      )}
    </div>
  )
}
