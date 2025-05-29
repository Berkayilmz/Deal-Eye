// backend/server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// DB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => console.error('❌ MongoDB bağlantı hatası:', err.message))


app.get('/test', (req, res) => {
  console.log('🧪 Test route çalıştı')
  res.json({ message: 'Test başarılı' })
})

// Örnek rota
app.get('/', (req, res) => {
  res.send('API çalışıyor')
})

// Ürün rotaları
const productRoutes = require('./routes/productRoutes')
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`)
})