

const Orders = require('../models/order-model')

const { redisClient } = require('../controllers/session-controllers')



function updateProfileCache(profile){
    let profileString = JSON.stringify(profile)
    redisClient.set('profile', profileString).then(
        result => {
            if(result === 'OK'){
                console.log('order processed')
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
    updateProfileCache(userProfile)
    console.log(userProfile)


}



module.exports = {
    submitOrderToProcess

}