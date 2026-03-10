// Claude Haiku analysis via Netlify function (keeps API key server-side)
export async function analyzeWithClaude(productName, ingredientsText, preAnalysis) {
  const res = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productName, ingredientsText, preAnalysis }),
  })
  if (!res.ok) throw new Error('Analysis failed')
  return res.json()
}
