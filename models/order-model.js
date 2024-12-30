const { Schema, model, SchemaTypes} = require('mongoose');





const OrderSchema = new Schema({
    shipping_address: {
        direccion: String,
        casa: String,
        infoExtra: String,
    },
    sale_detail: {
        customer: {
            name: String,
            email: String,
            contact_phone: String
        },
        products: {type: []},
        total: Number,
        dateIssued: {type: Date},
        pay_method: String,
        status: String,
    }
})


module.exports = model('Orders', OrderSchema)