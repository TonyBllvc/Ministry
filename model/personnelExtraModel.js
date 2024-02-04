import mongoose, { } from "mongoose";

const personnelExtraSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
});

const PersonnelExtra = mongoose.model.extras || mongoose.model('extra', personnelExtraSchema);

export default PersonnelExtra