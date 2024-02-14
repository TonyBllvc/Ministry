import mongoose, { Schema } from "mongoose";

const structureProvSchema = mongoose.Schema({
    portfolio: {
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
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Schema.Types.ObjectId,
        require: true
    },
    images: {
        type: String
    }
}, {
    timestamps: true,
});

const StructureProvince = mongoose.model.provinces || mongoose.model('province', structureProvSchema);

export default StructureProvince