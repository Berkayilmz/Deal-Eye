const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('../models/Product')

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
  console.error('❌ HATA: .env dosyasından MONGO_URI alınamadı.')
  process.exit(1)
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('✅ MongoDB bağlantısı başarılı.')
  } catch (err) {
    console.error('❌ MongoDB bağlantı hatası:', err.message)
    process.exit(1)
  }
}

const updateOrInsertData = async () => {
  try {
    const filePath = path.join(__dirname, '../market-fiyat-org/products.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    let inserted = 0
    let updated = 0
    let skipped = 0

    for (const incoming of data) {
      const { urunId, market, urun, img, prices } = incoming

      // Ürünü ID ile bul
      let product = await Product.findOne({ urunId })

      if (product) {
        let hasUpdate = false

        for (const [date, priceRaw] of Object.entries(prices)) {
          let price = parseFloat(String(priceRaw).replace(',', '.'))
          if (isNaN(price)) price = 0.0

          if (!product.prices[date]) {
            product.prices[date] = price
            hasUpdate = true
          }
        }

        if (hasUpdate) {
          await product.save()
          updated++
        } else {
          skipped++
        }
      } else {
        // Fiyatları parse ederek yeni obje oluştur
        const cleanedPrices = {}

        for (const [date, priceRaw] of Object.entries(prices)) {
          let price = parseFloat(String(priceRaw).replace(',', '.'))
          if (isNaN(price)) price = 0.0
          cleanedPrices[date] = price
        }

        await Product.create({
          urunId,
          market,
          urun,
          img,
          prices: cleanedPrices
        })

        inserted++
      }
    }

    console.log(`✅ Güncelleme tamamlandı: ${updated} güncellendi, ${inserted} eklendi, ${skipped} atlandı.`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Güncelleme hatası:', err.message)
    process.exit(1)
  }
}

connectDB().then(updateOrInsertData)