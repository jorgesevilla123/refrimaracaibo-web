

const Orders = require('../models/order-model')
const Users = require('../models/user-model')
const { redisClient } = require('../controllers/session-controllers')



function updateProfileCache(profile){
    console.log(profile)
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
    console.log('showing current order confirm number', current_order.confirmation_number)
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
        status: current_order.status,
        confirmation_number: current_order.confirmation_number
    }
    //this objec
    shippingAddressObject = {
        name: shipping_address.name,
        direccion: shipping_address.direccion,
        casa: shipping_address.casa,
        infoExtra: shipping_address.infoExtra
    }



    // ADAPTAR ESTE OBJETO DE ORDEN PARA QUE SE ADAPTE AL MODELO DEL USUARIO
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
            delete userProfile.current_order // temporary data deleted when saved to orders
            updateProfileCache(userProfile)
            saveOrderToUser(userProfile.user_id, newOrder);
            console.log(result);
            console.log('order saved!', result);
            res.json({message: 'order saved!'});
         
        }
    })
}







function saveOrderToUser(userId, order){

    Users.findByIdAndUpdate({_id : userId}, {$push: {orders: order}}, (err, result) => {
        if(err){
            console.log(err);
        }
        else {
            console.log('saving order to user',result);
        }
    })



}



module.exports = {
    submitOrderToProcess

}