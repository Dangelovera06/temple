const BASE_URL = 'https://world.openfoodfacts.org/api/v2/product'

export async function fetchProductByBarcode(barcode) {
  const res = await fetch(
    `${BASE_URL}/${barcode}.json?fields=product_name,brands,ingredients_text,ingredients,nutriments,image_url,nutriscore_grade,additives_tags,labels`
  )
  if (!res.ok) throw new Error('Product not found')
  const data = await res.json()
  if (data.status === 0) throw new Error('Product not found')
  const product = data.product

  // Build ingredients_text from ingredients array if text is empty
  if (!product.ingredients_text && Array.isArray(product.ingredients) && product.ingredients.length > 0) {
    product.ingredients_text = product.ingredients.map(i => i.text || i.id || '').filter(Boolean).join(', ')
  }

  return product
}

export async function searchProducts(query) {
  const res = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10&fields=code,product_name,brands,image_url,nutriscore_grade,nutriments`
  )
  if (!res.ok) throw new Error('Search failed')
  const data = await res.json()
  return data.products || []
}
