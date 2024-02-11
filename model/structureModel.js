import mongoose, { Schema } from "mongoose";

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
        type: String,
        required: true,
        trim: true
    },
    // id: {
    //     type: Schema.Types.ObjectId,
    //     require: true
    // },
    // images: {
    //     type: String
    // }
}, {
    timestamps: true,
});

const Structure = mongoose.model.structures || mongoose.model('structure', structureSchema);

export default Structure