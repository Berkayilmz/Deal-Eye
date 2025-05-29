// utils/fetchProductById.js
export const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`)
      if (!response.ok) {
        throw new Error('Ürün verisi alınamadı')
      }
  
      const item = await response.json()
  
      // Market adını düzelt
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
          break
      }
  
      return {
        ...item,
        market: formattedMarket
      }
    } catch (error) {
      console.error('fetchProductById Hatası:', error)
      return null
    }
  }