import mongoose, { } from "mongoose";

const waitingSchema = mongoose.Schema({
    _id: {
        // type: Schema.Types.ObjectId
        type: mongoose.Types.ObjectId
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pending: {
        enum: ['yes', 'no'],
        type: String
    },
    otpCode: {
        type: Number
    }

}, {
    timestamps: true,
});

const Waiting = mongoose.model.waitings || mongoose.model('waiting', waitingSchema);

export default Waiting