import mongoose, { } from "mongoose";

const personnelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true

    },
}, {
    timestamps: true,
});

const Personnel = mongoose.model.personnels || mongoose.model('personnel', personnelSchema);

export default Personnel