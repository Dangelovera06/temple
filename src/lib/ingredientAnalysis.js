const SEED_OILS = [
  { match: /canola oil/i, name: 'Canola Oil', reason: 'Highly processed seed oil, high omega-6, often GMO', severity: 'high', category: 'Seed Oil' },
  { match: /vegetable oil/i, name: 'Vegetable Oil', reason: 'Vague term — usually soybean or canola, highly inflammatory', severity: 'high', category: 'Seed Oil' },
  { match: /soybean oil/i, name: 'Soybean Oil', reason: 'High omega-6 seed oil, often GMO, promotes inflammation', severity: 'high', category: 'Seed Oil' },
  { match: /sunflower oil/i, name: 'Sunflower Oil', reason: 'Very high omega-6, unstable at heat', severity: 'medium', category: 'Seed Oil' },
  { match: /corn oil/i, name: 'Corn Oil', reason: 'High omega-6 seed oil, often GMO', severity: 'high', category: 'Seed Oil' },
  { match: /cottonseed oil/i, name: 'Cottonseed Oil', reason: 'High pesticide residue risk, contains gossypol', severity: 'high', category: 'Seed Oil' },
  { match: /safflower oil/i, name: 'Safflower Oil', reason: 'Extremely high omega-6 content', severity: 'medium', category: 'Seed Oil' },
  { match: /grapeseed oil/i, name: 'Grapeseed Oil', reason: 'Very high omega-6, often solvent-extracted', severity: 'medium', category: 'Seed Oil' },
  { match: /rice bran oil/i, name: 'Rice Bran Oil', reason: 'Processed seed oil, high omega-6', severity: 'medium', category: 'Seed Oil' },
  { match: /palm oil/i, name: 'Palm Oil', reason: 'Highly saturated, linked to inflammation when refined', severity: 'medium', category: 'Seed Oil' },
  { match: /partially hydrogenated/i, name: 'Partially Hydrogenated Oil', reason: 'Contains trans fats — directly linked to heart disease', severity: 'high', category: 'Trans Fat' },
  { match: /hydrogenated vegetable|hydrogenated soybean|hydrogenated palm/i, name: 'Hydrogenated Oil', reason: 'May contain trans fats, highly processed', severity: 'high', category: 'Trans Fat' },
]

const REFINED_GRAINS = [
  { match: /bleached flour|bleached wheat flour|bleached enriched flour/i, name: 'Bleached Flour', reason: 'Chemically whitened with chlorine compounds, strips nutrients', severity: 'medium', category: 'Refined Grain' },
  { match: /enriched flour|enriched wheat flour/i, name: 'Enriched Flour', reason: 'Stripped of natural nutrients, synthetic vitamins added back', severity: 'low', category: 'Refined Grain' },
  { match: /white flour/i, name: 'White Flour', reason: 'Refined grain with fiber and nutrients removed', severity: 'low', category: 'Refined Grain' },
  { match: /refined wheat/i, name: 'Refined Wheat', reason: 'Processed grain, high glycemic, low nutrients', severity: 'low', category: 'Refined Grain' },
]

const ADDED_SUGARS = [
  { match: /high fructose corn syrup|\bHFCS\b/i, name: 'High Fructose Corn Syrup', reason: 'Linked to obesity, fatty liver, and metabolic syndrome', severity: 'high', category: 'Added Sugar' },
  { match: /corn syrup\b/i, name: 'Corn Syrup', reason: 'Highly refined liquid sugar, spikes blood glucose rapidly', severity: 'medium', category: 'Added Sugar' },
  { match: /\bdextrose\b/i, name: 'Dextrose', reason: 'Pure glucose — high glycemic index, rapid blood sugar spike', severity: 'low', category: 'Added Sugar' },
  { match: /maltodextrin/i, name: 'Maltodextrin', reason: 'Higher glycemic index than table sugar, promotes gut dysbiosis', severity: 'medium', category: 'Added Sugar' },
  { match: /glucose-fructose syrup|glucose fructose/i, name: 'Glucose-Fructose Syrup', reason: 'European equivalent of HFCS, linked to same metabolic issues', severity: 'high', category: 'Added Sugar' },
  { match: /invert sugar/i, name: 'Invert Sugar', reason: 'Processed sugar blend, highly refined', severity: 'low', category: 'Added Sugar' },
]

const ARTIFICIAL_SWEETENERS = [
  { match: /aspartame/i, name: 'Aspartame', reason: 'Classified as "possible carcinogen" by WHO (2023)', severity: 'high', category: 'Artificial Sweetener' },
  { match: /sucralose/i, name: 'Sucralose', reason: 'May alter gut bacteria and spike insulin response', severity: 'medium', category: 'Artificial Sweetener' },
  { match: /acesulfame potassium|acesulfame-k|\bace-k\b/i, name: 'Acesulfame-K', reason: 'Artificial sweetener, may affect metabolism and gut health', severity: 'medium', category: 'Artificial Sweetener' },
  { match: /saccharin/i, name: 'Saccharin', reason: 'Linked to gut microbiome disruption', severity: 'medium', category: 'Artificial Sweetener' },
  { match: /advantame/i, name: 'Advantame', reason: 'Newer artificial sweetener, limited long-term data', severity: 'low', category: 'Artificial Sweetener' },
]

const ARTIFICIAL_ADDITIVES = [
  { match: /red\s*40|allura red/i, name: 'Red 40', reason: 'Artificial dye linked to hyperactivity in children, banned in some countries', severity: 'high', category: 'Artificial Dye' },
  { match: /yellow\s*5|tartrazine/i, name: 'Yellow 5 (Tartrazine)', reason: 'Artificial dye, may cause allergic reactions and hyperactivity', severity: 'medium', category: 'Artificial Dye' },
  { match: /yellow\s*6|sunset yellow/i, name: 'Yellow 6', reason: 'Artificial dye linked to hyperactivity and adrenal tumors in animals', severity: 'medium', category: 'Artificial Dye' },
  { match: /blue\s*1|brilliant blue/i, name: 'Blue 1', reason: 'Artificial dye, limited safety data, may cross blood-brain barrier', severity: 'medium', category: 'Artificial Dye' },
  { match: /blue\s*2|indigo carmine/i, name: 'Blue 2', reason: 'Artificial dye, linked to behavioral issues in some studies', severity: 'medium', category: 'Artificial Dye' },
  { match: /\bBHA\b/i, name: 'BHA', reason: 'Preservative listed as possible carcinogen by IARC', severity: 'high', category: 'Preservative' },
  { match: /\bBHT\b/i, name: 'BHT', reason: 'Synthetic antioxidant, potential endocrine disruptor', severity: 'high', category: 'Preservative' },
  { match: /\bTBHQ\b/i, name: 'TBHQ', reason: 'Petroleum-derived preservative linked to immune issues', severity: 'high', category: 'Preservative' },
  { match: /sodium nitrate|sodium nitrite/i, name: 'Sodium Nitrate/Nitrite', reason: 'Preservative linked to increased colorectal cancer risk', severity: 'high', category: 'Preservative' },
  { match: /carrageenan/i, name: 'Carrageenan', reason: 'May cause gut inflammation and digestive issues', severity: 'medium', category: 'Additive' },
  { match: /titanium dioxide/i, name: 'Titanium Dioxide', reason: 'Nano-particles banned in EU food, potential DNA damage', severity: 'high', category: 'Additive' },
  { match: /monosodium glutamate|\bMSG\b/i, name: 'MSG', reason: 'Flavor enhancer that causes headaches and sensitivity in some people', severity: 'low', category: 'Additive' },
  { match: /modified starch|modified food starch/i, name: 'Modified Food Starch', reason: 'Highly processed, vague sourcing, usually corn or potato based', severity: 'low', category: 'Additive' },
  { match: /artificial flavor/i, name: 'Artificial Flavors', reason: 'Synthetic chemicals — no requirement to disclose specific compounds', severity: 'medium', category: 'Artificial Flavor' },
  { match: /artificial colou?r/i, name: 'Artificial Colors', reason: 'Synthetic dyes with limited long-term safety data', severity: 'medium', category: 'Artificial Dye' },
  { match: /propyl gallate/i, name: 'Propyl Gallate', reason: 'Preservative linked to hormonal disruption', severity: 'medium', category: 'Preservative' },
  { match: /sodium benzoate/i, name: 'Sodium Benzoate', reason: 'Reacts with Vitamin C to form benzene, a carcinogen', severity: 'high', category: 'Preservative' },
  { match: /potassium bromate/i, name: 'Potassium Bromate', reason: 'Banned in EU and Canada, possible human carcinogen', severity: 'high', category: 'Additive' },
]

const ALL_FLAGS = [...SEED_OILS, ...REFINED_GRAINS, ...ADDED_SUGARS, ...ARTIFICIAL_SWEETENERS, ...ARTIFICIAL_ADDITIVES]

export function analyzeIngredients(ingredientsText) {
  if (!ingredientsText) return { flagged: [], score: 'unknown', summary: null }

  const flagged = []
  for (const item of ALL_FLAGS) {
    if (item.match.test(ingredientsText)) {
      flagged.push(item)
    }
  }

  const highCount = flagged.filter(f => f.severity === 'high').length
  const medCount = flagged.filter(f => f.severity === 'medium').length

  let score
  if (flagged.length === 0) score = 'A'
  else if (highCount === 0 && medCount <= 1) score = 'B'
  else if (highCount <= 1 && medCount <= 2) score = 'C'
  else if (highCount <= 2) score = 'D'
  else score = 'E'

  // Generate a plain-English local summary (used before AI loads)
  let summary
  if (flagged.length === 0) {
    summary = 'No concerning ingredients detected from our database. This product appears to be free of common seed oils, artificial additives, and harmful preservatives.'
  } else {
    const cats = [...new Set(flagged.map(f => f.category))]
    const highItems = flagged.filter(f => f.severity === 'high').map(f => f.name)
    if (highCount > 0) {
      summary = `Contains ${highItems.slice(0, 2).join(' and ')}${highItems.length > 2 ? ` and ${highItems.length - 2} more high-severity ingredients` : ''}. Found issues with: ${cats.join(', ')}.`
    } else {
      summary = `Contains ${flagged.length} ingredient${flagged.length > 1 ? 's' : ''} worth noting: ${cats.join(', ')}. These are moderate concerns — not dangerous but worth being aware of.`
    }
  }

  return { flagged, score, summary }
}

// Goal-specific insights based on local analysis
export function getGoalInsights(product, flagged, goals = []) {
  const insights = []
  if (!goals.length) return insights

  const nutriments = product?.nutriments || {}
  const carbs = nutriments['carbohydrates_100g'] || 0
  const sugar = nutriments['sugars_100g'] || 0
  const protein = nutriments['proteins_100g'] || 0
  const calories = nutriments['energy-kcal_100g'] || 0

  if (goals.includes('avoid_seed_oils')) {
    const oilFlags = flagged.filter(f => f.category === 'Seed Oil' || f.category === 'Trans Fat')
    if (oilFlags.length > 0) insights.push({ icon: '🛢️', text: `Contains ${oilFlags.map(f => f.name).join(', ')} — avoid for your seed oil goal`, bad: true })
    else insights.push({ icon: '🛢️', text: 'No seed oils detected — good match for your goal', bad: false })
  }

  if (goals.includes('low_sugar')) {
    const sugarFlags = flagged.filter(f => f.category === 'Added Sugar' || f.category === 'Artificial Sweetener')
    if (sugarFlags.length > 0) insights.push({ icon: '🍬', text: `Contains ${sugarFlags[0].name} — conflicts with your low-sugar goal`, bad: true })
    else if (sugar > 15) insights.push({ icon: '🍬', text: `High sugar content (${sugar.toFixed(1)}g/100g) — may not fit your goal`, bad: true })
    else insights.push({ icon: '🍬', text: `Low in added sugars — fits your low-sugar goal`, bad: false })
  }

  if (goals.includes('keto')) {
    if (carbs > 10) insights.push({ icon: '🥑', text: `High carbs (${carbs.toFixed(1)}g/100g) — not keto-friendly`, bad: true })
    else insights.push({ icon: '🥑', text: `Low carb (${carbs.toFixed(1)}g/100g) — fits keto`, bad: false })
  }

  if (goals.includes('high_protein')) {
    if (protein >= 15) insights.push({ icon: '💪', text: `Good protein source (${protein.toFixed(1)}g/100g)`, bad: false })
    else if (protein < 5) insights.push({ icon: '💪', text: `Low protein (${protein.toFixed(1)}g/100g) — won't help your muscle goal`, bad: true })
    else insights.push({ icon: '💪', text: `Moderate protein (${protein.toFixed(1)}g/100g)`, bad: false })
  }

  if (goals.includes('lose_weight')) {
    if (calories > 400) insights.push({ icon: '⚖️', text: `High calorie density (${calories}kcal/100g) — portion carefully`, bad: true })
    else insights.push({ icon: '⚖️', text: `Moderate calories (${calories}kcal/100g) — reasonable for weight loss`, bad: false })
  }

  if (goals.includes('avoid_artificial')) {
    const artFlags = flagged.filter(f => ['Artificial Dye', 'Artificial Flavor', 'Preservative', 'Artificial Sweetener'].includes(f.category))
    if (artFlags.length > 0) insights.push({ icon: '🚫', text: `Contains ${artFlags.length} artificial ingredient${artFlags.length > 1 ? 's' : ''} — conflicts with your goal`, bad: true })
    else insights.push({ icon: '🚫', text: 'No artificial additives detected — clean for your goal', bad: false })
  }

  return insights
}
