import { Schema, model, Document, ObjectId, SchemaTypes} from 'mongoose';



export interface ProductToOrderInterface extends Document {
    title: string,
    modelo: string,
    cantidad_pedido: number,
    estado: string
}

export const productToOrderSchema: Schema = new Schema({
    title: {type: String, index: true},
    modelo: {type: String, index: true},
    cantidad_pedido: Number,
    estado: String
})

export default model<ProductToOrderInterface>('ProductToOrder',productToOrderSchema)