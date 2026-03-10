import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { productName, ingredientsText, preAnalysis } = await req.json()

  const prompt = `You are a food ingredient health expert. Analyze this product's ingredients and return ONLY valid JSON (no markdown, no explanation outside JSON).

Product: ${productName}
Ingredients: ${ingredientsText}
Pre-flagged ingredients: ${JSON.stringify(preAnalysis.flagged.map(f => f.name))}

Return this exact JSON structure:
{
  "health_score": "A",
  "score_reason": "Brief reason for score",
  "flagged_ingredients": [
    {"name": "ingredient name", "reason": "why it's bad", "severity": "high|medium|low"}
  ],
  "good_aspects": ["positive thing 1", "positive thing 2"],
  "alternatives": [
    {"name": "Product Name or Category", "reason": "why it's better"}
  ],
  "summary": "2-sentence plain English verdict for a health-conscious consumer."
}

Health score guide: A=clean, B=mostly clean, C=some concerns, D=several harmful, E=very harmful.
Be honest and direct. Focus on seed oils, artificial additives, preservatives, and sweeteners.`

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
