const { Schema, model, SchemaTypes } = require('mongoose');





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
        order_id: Number,
        products: { type: [] },
        total: Number,
        date: { type: Date },
        pay_method: String,
        status: String,
    }
})


module.exports = model('Orders', OrderSchema)