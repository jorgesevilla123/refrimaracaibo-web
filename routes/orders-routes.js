
const { Router } = require('express')
const { submitOrderToProcess } = require('../controllers/orders-controllers')
let router = Router()



router.route('/submit-order').post(submitOrderToProcess)



//order cancelation implementation (TO DEVELOP)
router.route('/cancel-order').post()




module.exports = router