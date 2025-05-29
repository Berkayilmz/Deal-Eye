const express = require('express');
const router = express.Router()

const {
    getAllProducts,
    getProductById,
    getProductsByMarket,
} = require('../controllers/productController');

router.get('/', getAllProducts)
router.get('/:urunId', getProductById)
router.get('/market/:market', getProductsByMarket)

module.exports = router