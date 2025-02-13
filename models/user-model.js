const { Schema, model } = require('mongoose')




const userSchema = new Schema({
    name: String,
    email: String,
    contact_phone: String,
    password: String,
    shipping_addresses: Array,
    cart: Array,
    orders: [{
        order_id: String,
        date: Date,
        pay_method: String,
        products_cart: Array,
        status: String,
        total: Number
    }]
})




module.exports =  model('User', userSchema);