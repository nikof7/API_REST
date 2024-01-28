import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: {
        type : String,
        required: true,
        index: {unique: true}
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: Boolean,
        default: false,
        required: true
    }
    /* imagenes, objectid*/
})