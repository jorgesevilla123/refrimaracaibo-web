const { Router } = require('express')
const { getSession, sessionChecker, createUser, addToCart, removeFromCart, updateQuantities, productSelection, login, logout, addShippingAddress, handleShippingAddresses } = require('../controllers/session-controllers')








let sessionRouter = Router()






sessionRouter.route('/get-session').get(getSession)





sessionRouter.route('/create-user').post(createUser)




sessionRouter.route('/check-session').get(sessionChecker)




sessionRouter.route('/add-to-cart').post(addToCart)




sessionRouter.route('/remove-from-cart').post(removeFromCart)


sessionRouter.route('/update-quantities').put(updateQuantities)




sessionRouter.route('/product-selection').post(productSelection)




sessionRouter.route('/login').post(login)



sessionRouter.route('/logout').delete(logout)





sessionRouter.route('/update-shipping').post(handleShippingAddresses)


module.exports = sessionRouter