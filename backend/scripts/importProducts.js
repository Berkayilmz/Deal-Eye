const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('../models/Product')

// ENV yolunu özellikle belirt (özellikle script klasöründen çalıştırılıyorsa)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

// URI kontrolü
const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
  console.error('❌ HATA: .env dosyasından MONGO_URI alınamadı.')
  process.exit(1)
}

console.log('🌐 Mongo URI:', mongoUri)

// Veritabanı bağlantısı
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('✅ MongoDB bağlantısı başarılı.')
  } catch (err) {
    console.error('❌ MongoDB bağlantı hatası:', err.message)
    process.exit(1)
  }
}

// Verileri içeri aktar
const importData = async () => {
  try {
    const filePath = path.join(__dirname, '../market-fiyat-org/products.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    await Product.deleteMany()
    await Product.insertMany(data)

    console.log(`✅ ${data.length} ürün başarıyla eklendi.`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Veri yükleme hatası:', err.message)
    process.exit(1)
  }
}

connectDB().then(importData)