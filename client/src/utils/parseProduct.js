
export const parseProduct = (product) => {
    const { id, market, urun, img } = product
  
    // Ürün içindeki tarih formatındaki key'leri bul
    const dateKeys = Object.keys(product).filter(key =>
      /^\d{2}-\d{2}-\d{4}$/.test(key) &&
      typeof product[key] === 'string' &&
      product[key].includes('₺')
    )
  
    if (dateKeys.length === 0) {
      return { id, market, urun, img, date: null, price: null }
    }
  
    // En son tarihli fiyatı bul
    const latestDate = dateKeys.sort((a, b) => new Date(b) - new Date(a))[0]
    const rawPrice = product[latestDate]
    const parsedPrice = parseFloat(rawPrice.replace(',', '.').replace('₺', '').trim())
  
    return {
      id,
      market,
      urun,
      img,
      date: latestDate,
      price: parsedPrice,
    }
  }