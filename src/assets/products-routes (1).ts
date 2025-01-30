import  { Router } from 'express'
import { getProducts, test, searchProducts, deleteProduct, updateProduct, addProduct, updatePhoto, calculateTotal, addProductToOrder, getProductsToOrder } from "../controllers/products-controllers";
const router = Router();




router.route('/').get(test)



router.route('/get-products').get(getProducts)


router.route('/calculate-total').get(calculateTotal)



router.route('/add-product').post(addProduct)


router.route('/search-products').get()



router.route('/search-products').post(searchProducts)



router.route('/get-low-stock-products').get()




router.route('/delete-product/:id').delete(deleteProduct)



router.route('/update-product/:id').put(updateProduct)



router.route('/update-photo/:id').put(updatePhoto)





router.route('/decrease-inventory').put()





router.route('/increase-inventory').put()



////////////////////////////////// products to order routes



router.route('/add-product-to-order').post(addProductToOrder)



router.route('/get-products-to-order').get(getProductsToOrder)


export default router




