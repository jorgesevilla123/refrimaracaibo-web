const { Router } = require('express')
const { getProducts, searchProducts, getProductsByCategory, filterCategory, getSomeProducts, filterTools} =  require('../controllers/products-controllers')

let router = Router()







router.route('/get-products').get(getProducts)


router.route('/filter').get(filterCategory)


router.route('/get-herramientas').get(filterTools)



router.route('/get-some-products').get(getSomeProducts)




router.route('/search-products').get(searchProducts)



router.route('/get-category/:category/:page/:pageName').get(getProductsByCategory)








module.exports = router