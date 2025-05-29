const express = require('express')
const connectDB = require('./config/db')

connectDB()

const app = express()
// Diğer express ayarları...

app.listen(5000, () => {
  console.log('Sunucu 5000 portunda çalışıyor')
})