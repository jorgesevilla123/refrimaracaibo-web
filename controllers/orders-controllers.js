

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
   

    const { shipping_address, name, email, contact_phone, } = req.body
    console.log(shipping_address, name, email, contact_phone)
    saleDetailObject = {
        customer: {
            name: name,
            email: email,
            contact_phone: contact_phone
        }
    }

    const newOrder = {
        shipping_address: shipping_address,
        sale_detail: 
    }

    delete userProfile.shipping_address
    console.log(userProfile);
    updateProfileCache(userProfile)
 


}



module.exports = {
    submitOrderToProcess

}