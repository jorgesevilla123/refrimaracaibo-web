
const { Router } = require('express')
const { submitOrderToProcess } = require('../controllers/orders-controllers')
let router = Router()



router.route('/submit-order').post(submitOrderToProcess)




module.exports = router