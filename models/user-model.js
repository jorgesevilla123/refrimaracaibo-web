const { Schema, model } = require('mongoose')




const userSchema = new Schema({
    name: String,
    email: String,
    contact_phone: String,
    password: String,
    shipping_addresses: Array,
    cart: Array,

})




module.exports =  model('User', userSchema);