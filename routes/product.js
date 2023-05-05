const express = require('express')
const productController = require('../controllers/product')

const router = express.Router()

router.get('/list',productController.getProductsItem)

router.get('/cart',productController.getCart)

router.post('/product',productController.postProduct)

router.post('/cart',productController.postCart)

router.put('/product/:id',productController.putProduct)

router.delete('/product/:id',productController.deleteProduct)

router.delete('/cart/:id',productController.deleteCart)

module.exports = router;