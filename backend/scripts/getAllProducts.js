const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('../models/Product')

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
  console.error('❌ .env dosyasından MONGO_URI alınamadı.')
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

const getAllProducts = async () => {
  try {
    const products = await Product.find({urunId})
    console.log(`🔍 Toplam ${products.length} ürün bulundu.`)
    console.dir(products, { depth: null, colors: true })
    console.log(products.length);
    process.exit(0)
  } catch (err) {
    console.error('❌ Ürünler alınamadı:', err.message)
    process.exit(1)
  }
}

connectDB().then(getAllProducts)