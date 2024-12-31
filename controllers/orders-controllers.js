

const Orders = require('../models/order-model')

const { redisClient } = require('../controllers/session-controllers')



function updateProfileCache(profile){
    let profileString = JSON.stringify(profile)
    redisClient.set('profile', profileString).then(
        result => {
            if(result === 'OK'){
                console.log('Profile updated in cache')
            }
            else {
                console.log('error in redis')
            }
        }
    ).catch(
        (err) => {
            console.log('Error updatin profile in cache', err)
        }
    )
}



function submitOrderToProcess(req, res){
    let userProfile = req.body
   

    const { shipping_address, name, email, contact_phone, current_order } = req.body
    // console.log(shipping_address, name, email, contact_phone)
    saleDetailObject = {
        customer: {
            name: name,
            email: email,
            contact_phone: contact_phone
        },
        order_id: current_order.order_id,
        products: current_order.products_cart,
        total: current_order.total,
        date: current_order.date,
        pay_method: current_order.pay_method,
        status: current_order.status
    }
    //this objec
    shippingAddressObject = {
        name: shipping_address.name,
        direccion: shipping_address.direccion,
        casa: shipping_address.casa,
        infoExtra: shipping_address.infoExtra
    }

    const newOrder = {
        shipping_address: shippingAddressObject,
        sale_detail: saleDetailObject
    }

    console.log('loggin new order', newOrder)

  

    const addOrder = new Orders(newOrder);
    addOrder.save((err, result) => {
        if(err){
            console.log('error saving order', err)

        }
        else {
            delete userProfile.shipping_address //temporary data deleted when saved to orders
            delete userProfile. // temporary data deleted when saved to orders
            updateProfileCache(userProfile);
            console.log(result);
            res.json({message: 'order saved!'});
            console.log('order saved!', products);
        }
    })
  

 


}



module.exports = {
    submitOrderToProcess

}