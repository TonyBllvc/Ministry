import mongoose, { } from "mongoose";

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    // properties: [
    //     {
    //         type: Object
    //     }
    // ]
});

const Brand = mongoose.model.brand || mongoose.model('brand', brandSchema);

export default Brand