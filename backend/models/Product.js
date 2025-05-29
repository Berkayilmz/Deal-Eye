// models/Product.js
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  urunId: Number,
  market: String,
  urun: String,
  img: String,
  prices: Object
})

module.exports = mongoose.model('Product', productSchema)