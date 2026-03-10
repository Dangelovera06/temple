const BAD_OILS = [
  { match: /canola oil/i, name: 'Canola Oil', reason: 'Highly processed seed oil, high in omega-6, often GMO', severity: 'high' },
  { match: /vegetable oil/i, name: 'Vegetable Oil', reason: 'Vague term — usually soybean or canola, inflammatory', severity: 'high' },
  { match: /soybean oil/i, name: 'Soybean Oil', reason: 'High omega-6 seed oil, often GMO, promotes inflammation', severity: 'high' },
  { match: /sunflower oil/i, name: 'Sunflower Oil', reason: 'High omega-6 content, destabilizes at high heat', severity: 'medium' },
  { match: /corn oil/i, name: 'Corn Oil', reason: 'High omega-6 seed oil, often GMO', severity: 'high' },
  { match: /cottonseed oil/i, name: 'Cottonseed Oil', reason: 'Contains gossypol, high pesticide residue risk', severity: 'high' },
  { match: /safflower oil/i, name: 'Safflower Oil', reason: 'Very high omega-6 content', severity: 'medium' },
  { match: /palm oil/i, name: 'Palm Oil', reason: 'High in saturated fat, deforestation concerns', severity: 'medium' },
  { match: /partially hydrogenated/i, name: 'Partially Hydrogenated Oil', reason: 'Contains trans fats — linked to heart disease', severity: 'high' },
  { match: /hydrogenated/i, name: 'Hydrogenated Oil', reason: 'May contain trans fats, highly processed', severity: 'high' },
]

const BAD_ADDITIVES = [
  { match: /red\s*40|allura red/i, name: 'Red 40', reason: 'Artificial dye linked to hyperactivity in children', severity: 'high' },
  { match: /yellow\s*5|tartrazine/i, name: 'Yellow 5', reason: 'Artificial dye, may cause allergic reactions', severity: 'medium' },
  { match: /yellow\s*6|sunset yellow/i, name: 'Yellow 6', reason: 'Artificial dye linked to hyperactivity', severity: 'medium' },
  { match: /blue\s*1|brilliant blue/i, name: 'Blue 1', reason: 'Artificial dye, limited safety data', severity: 'medium' },
  { match: /blue\s*2|indigo carmine/i, name: 'Blue 2', reason: 'Artificial dye', severity: 'medium' },
  { match: /\bBHA\b/i, name: 'BHA', reason: 'Preservative listed as possible carcinogen by IARC', severity: 'high' },
  { match: /\bBHT\b/i, name: 'BHT', reason: 'Synthetic antioxidant, potential endocrine disruptor', severity: 'high' },
  { match: /\bTBHQ\b/i, name: 'TBHQ', reason: 'Petroleum-derived preservative linked to immune issues', severity: 'high' },
  { match: /sodium nitrate|sodium nitrite/i, name: 'Sodium Nitrate/Nitrite', reason: 'Preservative linked to increased cancer risk', severity: 'high' },
  { match: /carrageenan/i, name: 'Carrageenan', reason: 'May cause gut inflammation', severity: 'medium' },
  { match: /titanium dioxide/i, name: 'Titanium Dioxide', reason: 'Nano-particles banned in EU food products', severity: 'high' },
  { match: /aspartame/i, name: 'Aspartame', reason: 'Artificial sweetener, classified as "possible carcinogen" by WHO', severity: 'high' },
  { match: /sucralose/i, name: 'Sucralose', reason: 'May alter gut bacteria, spikes insulin response', severity: 'medium' },
  { match: /acesulfame potassium|acesulfame-k|ace-k/i, name: 'Acesulfame-K', reason: 'Artificial sweetener, may affect metabolism', severity: 'medium' },
  { match: /saccharin/i, name: 'Saccharin', reason: 'Oldest artificial sweetener, linked to gut microbiome disruption', severity: 'medium' },
  { match: /monosodium glutamate|\bMSG\b/i, name: 'MSG', reason: 'Flavor enhancer that may cause headaches and sensitivity in some people', severity: 'low' },
  { match: /high fructose corn syrup|\bHFCS\b/i, name: 'High Fructose Corn Syrup', reason: 'Linked to obesity, metabolic syndrome, and liver issues', severity: 'high' },
  { match: /modified starch|modified food starch/i, name: 'Modified Food Starch', reason: 'Highly processed, vague sourcing', severity: 'low' },
  { match: /artificial flavor|artificial colour|artificial color/i, name: 'Artificial Flavors/Colors', reason: 'Synthetic chemicals with limited long-term safety data', severity: 'medium' },
  { match: /propyl gallate/i, name: 'Propyl Gallate', reason: 'Preservative linked to hormonal disruption', severity: 'medium' },
]

export function analyzeIngredients(ingredientsText) {
  if (!ingredientsText) return { flagged: [], score: 'unknown' }

  const flagged = []

  for (const item of BAD_OILS) {
    if (item.match.test(ingredientsText)) {
      flagged.push({ ...item, category: 'Bad Oil' })
    }
  }

  for (const item of BAD_ADDITIVES) {
    if (item.match.test(ingredientsText)) {
      flagged.push({ ...item, category: 'Additive' })
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

  return { flagged, score }
}
