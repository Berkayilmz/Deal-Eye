// utils/fetchProductByMarket.js
export const fetchProductByMarket = async (marketRaw) => {
  try {
    const response = await fetch(`http://localhost:8000/api/products/market/${marketRaw}`)
    if (!response.ok) {
      throw new Error('Ürün verisi alınamadı')
    }

    const items = await response.json()
    return items
  } catch (error) {
    console.error('fetchProductByMarket Hatası:', error)
    return []
  }
}