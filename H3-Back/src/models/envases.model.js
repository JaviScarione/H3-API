import mongoose from "mongoose";

const envaseSchema = new mongoose.Schema({
    h320: {
        type: Number,
        default: 0
    },
    h312: {
        type:Number,
        default: 0
    },
    lgm: {
        type: Number,
        default: 0
    },
    lgbs: {
        type: Number,
        default: 0
    },
    soda: {
        type: Number,
        default: 0
    },
    fc: {
        type: Number,
        default: 0
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Envase", envaseSchema);