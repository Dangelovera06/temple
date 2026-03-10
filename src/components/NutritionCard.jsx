export default function NutritionCard({ nutriments }) {
  if (!nutriments) return null

  const items = [
    { label: 'Calories', value: nutriments['energy-kcal_100g'], unit: 'kcal/100g' },
    { label: 'Protein', value: nutriments['proteins_100g'], unit: 'g' },
    { label: 'Carbs', value: nutriments['carbohydrates_100g'], unit: 'g' },
    { label: 'Sugar', value: nutriments['sugars_100g'], unit: 'g' },
    { label: 'Fat', value: nutriments['fat_100g'], unit: 'g' },
    { label: 'Saturated Fat', value: nutriments['saturated-fat_100g'], unit: 'g' },
    { label: 'Fiber', value: nutriments['fiber_100g'], unit: 'g' },
    { label: 'Salt', value: nutriments['salt_100g'], unit: 'g' },
  ].filter(item => item.value !== undefined && item.value !== null)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Nutrition Facts <span className="text-gray-400 font-normal">per 100g</span></h3>
      </div>
      <div className="divide-y divide-gray-50">
        {items.map(item => (
          <div key={item.label} className="px-4 py-2.5 flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900">
              {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}
              <span className="text-gray-400 font-normal ml-1">{item.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
