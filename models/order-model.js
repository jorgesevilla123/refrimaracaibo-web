const { Schema, model, SchemaTypes} = require('mongoose');





const OrderSchema = new Schema({
    shipping_address: {
        avenida: String,
        calle: String,
        casa_apartamento: String,
        punto_referencia: String,
        info_adicional: String
    },
    sale_detail: {
        customer: {type: SchemaTypes.ObjectId},
        products: {type: []},
        total: Number,
        dateIssued: {type: Date},
        pay_method: String,
        status: String,
    }
})


module.exports = model('Orders', OrderSchema)