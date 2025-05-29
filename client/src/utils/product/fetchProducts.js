export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/products')
    if (!response.ok) {
      throw new Error('Veri alınamadı')
    }

    const data = await response.json()

    // Market adlarını burada direkt düzelt
    const formatted = data.map(item => {
      let formattedMarket = item.market

      switch (formattedMarket.toLowerCase()) {
        case 'bim':
          formattedMarket = 'BİM'
          break
        case 'a101':
          formattedMarket = 'A101'
          break
        case 'migros':
          formattedMarket = 'Migros'
          break
        case 'sok':
          formattedMarket = 'SOK'
          break
        case 'tarim_kredi':
        case 'tarım kredi':
          formattedMarket = 'Tarım Kredi Kooperatifi'
          break
        default:
          // olduğu gibi bırak
          break
      }

      return {
        ...item,
        market: formattedMarket
      }
    })

    return formatted
  } catch (error) {
    console.error('fetchProducts Hatası:', error)
    return []
  }
}
