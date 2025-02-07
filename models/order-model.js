const { Schema, model, SchemaTypes } = require('mongoose');





const OrderSchema = new Schema({
    shipping_address: {
        name: String,
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
        order_id: String,
        products: { type: [] },
        total: Number,
        date: { type: Date },
        pay_method: String,
        status: String,
        confirmation_number: String

    }
})


module.exports = model('Orders', OrderSchema)