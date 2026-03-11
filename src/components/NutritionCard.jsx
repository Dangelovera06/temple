export default function NutritionCard({ nutriments }) {
  if (!nutriments) return null

  const items = [
    { label: 'Calories', value: nutriments['energy-kcal_100g'], unit: 'kcal', accent: '#3b82f6' },
    { label: 'Protein', value: nutriments['proteins_100g'], unit: 'g', accent: '#10b981' },
    { label: 'Carbs', value: nutriments['carbohydrates_100g'], unit: 'g', accent: '#f59e0b' },
    { label: 'Sugar', value: nutriments['sugars_100g'], unit: 'g', accent: '#f97316' },
    { label: 'Fat', value: nutriments['fat_100g'], unit: 'g', accent: '#8b5cf6' },
    { label: 'Saturated Fat', value: nutriments['saturated-fat_100g'], unit: 'g', accent: '#ec4899' },
    { label: 'Fiber', value: nutriments['fiber_100g'], unit: 'g', accent: '#84cc16' },
    { label: 'Salt', value: nutriments['salt_100g'], unit: 'g', accent: '#94a3b8' },
  ].filter(item => item.value !== undefined && item.value !== null)

  return (
    <div style={{ background: '#111827', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontWeight: 700, color: 'white', fontSize: 13, margin: 0 }}>
          Nutrition Facts{' '}
          <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>per 100g</span>
        </h3>
      </div>
      <div>
        {items.map((item, i) => (
          <div key={item.label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '11px 16px',
            borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', background: item.accent, flexShrink: 0
              }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
              {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}
              <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, marginLeft: 3 }}>{item.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
