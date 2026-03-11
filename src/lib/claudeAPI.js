// Claude Haiku analysis via Netlify function (keeps API key server-side)
export async function analyzeWithClaude(productName, ingredientsText, preAnalysis, userGoals = []) {
  const res = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productName, ingredientsText, preAnalysis, userGoals }),
  })
  if (!res.ok) throw new Error('Analysis failed')
  return res.json()
}
