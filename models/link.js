import mongoose from "mongoose"
const { Schema, model } = mongoose

const linkSchema = new Schema({
    longLink: {
        type: String,
        required: true,
        trim: true
    },
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid: {
        // campo de union?
        type: Schema.Types.ObjectId,
        // de donde viene el objeto anterior? Sale de:
        ref: 'User',
        required: true
    }
})

export const Link = model('Link', linkSchema)