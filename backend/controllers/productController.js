const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getProductById = async (req, res) => {
    const urunId = parseInt(req.params.urunId)
    try {
        const product = await Product.findOne({ urunId })
        if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' })
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getProductsByMarket = async (req, res) => {
    try {
        const marketName = req.params.market
        const products = await Product.find({ market: marketName })

        if(!products.length) return res.status(404).json({message: 'Market bulunamadı veya ürün yok'})
        res.json(products)
    } catch (error) {
        res.statur(500).json({ message: 'Internal Server Error' })
    }
}



module.exports = { getAllProducts, getProductById, getProductsByMarket }