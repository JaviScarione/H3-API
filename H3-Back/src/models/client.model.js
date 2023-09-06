import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    cuit: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Client", clientSchema);