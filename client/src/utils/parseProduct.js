export const parseProduct = (product) => {
  const { urunId, market, urun, img, prices } = product

  if (!prices || typeof prices !== 'object') {
    return { id: urunId, market, urun, img, date: null, price: null }
  }

  const dateKeys = Object.keys(prices).filter(key =>
    /^\d{2}-\d{2}-\d{4}$/.test(key) && typeof prices[key] === 'number'
  )

  if (dateKeys.length === 0) {
    return { id: urunId, market, urun, img, date: null, price: null }
  }

  const latestDate = dateKeys.sort((a, b) => {
    const da = new Date(a.split('-').reverse().join('-'))
    const db = new Date(b.split('-').reverse().join('-'))
    return db - da
  })[0]

  const parsedPrice = prices[latestDate]

  return {
    id: urunId,
    market,
    urun,
    img,
    date: latestDate,
    price: parsedPrice,
  }
}