import mongoose, { Schema } from "mongoose";

const imageSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        require:  true
    },
    images: {
        type: String
    }

}, {
    timestamps: true,
});

const Image = mongoose.model.images || mongoose.model('image', imageSchema);

export default Image