import mongoose, { } from "mongoose";

const structureSchema = mongoose.Schema({
    office: {
        type: String,
        required: true,
        trim: true
    },
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

const Structure = mongoose.model.structures || mongoose.model('structure', structureSchema);

export default Structure