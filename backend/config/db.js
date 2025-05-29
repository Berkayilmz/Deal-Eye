
const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB bağlantısı başarılı: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB