const { Router } = require('express')
const { getProducts, searchProducts, getProductsByCategory, filterCategory } =  require("../controllers/products-controllers")

let router = Router()







router.route('/get-products').get(getProducts)



router.route('/get-some-products').get(getProducts)




router.route('/search-products').get(searchProducts)



router.route('/get-category/:category/:page/:pageName').get(getProductsByCategory)



router.route('/filter').post(filterCategory)





module.exports = router