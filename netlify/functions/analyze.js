import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { productName, ingredientsText, preAnalysis, userGoals = [] } = await req.json()

  const goalsContext = userGoals.length > 0
    ? `\nUser's health goals: ${userGoals.join(', ')}. Tailor your summary and flagged ingredients to highlight what matters for these goals.`
    : ''

  const goalGuide = {
    avoid_seed_oils: 'Flag any seed oils (canola, vegetable, soybean, sunflower, corn, cottonseed, safflower, grapeseed, rice bran) as high priority.',
    low_sugar: 'Flag any added sugars, syrups, or sweeteners as high priority.',
    keto: 'Note total carb content and flag any high-carb ingredients.',
    high_protein: 'Highlight protein content and note if it is high or low.',
    lose_weight: 'Note calorie density and flag high-calorie ingredients.',
    avoid_artificial: 'Flag all artificial dyes, artificial flavors, preservatives, and artificial sweeteners as high priority.',
  }
  const goalNotes = userGoals.map(g => goalGuide[g]).filter(Boolean).join(' ')

  const prompt = `You are a food ingredient health expert. Analyze this product and return ONLY valid JSON (no markdown, no explanation outside JSON).

Product: ${productName}
Ingredients: ${ingredientsText || 'Not available'}
Pre-flagged ingredients: ${JSON.stringify(preAnalysis.flagged.map(f => f.name))}${goalsContext}
${goalNotes ? `\nGoal-specific focus: ${goalNotes}` : ''}

Return this exact JSON structure:
{
  "health_score": "A",
  "score_reason": "Brief reason for score",
  "flagged_ingredients": [
    {"name": "ingredient name", "reason": "why it's concerning", "severity": "high|medium|low", "category": "Seed Oil|Preservative|Artificial Dye|Added Sugar|Artificial Sweetener|Refined Grain|Additive|Trans Fat|Artificial Flavor"}
  ],
  "good_aspects": ["positive thing 1", "positive thing 2"],
  "alternatives": [
    {"name": "Product Name or Category", "reason": "why it's better"}
  ],
  "summary": "2-3 sentence plain English verdict. Be factual, not alarmist. List what's actually in it."
}

Health score guide: A=clean, B=mostly clean with minor concerns, C=some concerning ingredients, D=multiple harmful ingredients, E=very problematic.
Be factual and direct. Use plain language — say "seed oil" not "toxic oil", say "artificial dye" not "dangerous chemical".
If no ingredients are available, score based on product type and give a general note.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  let analysis
  try {
    const text = message.content[0].text.trim()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text)
  } catch {
    analysis = {
      health_score: preAnalysis.score,
      score_reason: 'Analysis based on known harmful ingredients',
      flagged_ingredients: preAnalysis.flagged,
      good_aspects: [],
      alternatives: [],
      summary: 'This product contains ingredients that may be harmful. Consider a cleaner alternative.',
    }
  }

  return new Response(JSON.stringify(analysis), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = { path: '/.netlify/functions/analyze' }
