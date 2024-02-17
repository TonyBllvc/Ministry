import mongoose, { } from "mongoose";
import { Schema } from "mongoose";

const spiritualSchema = mongoose.Schema({
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

const SpiritualMS = mongoose.model.spirituals || mongoose.model('spiritual', spiritualSchema);

export default SpiritualMS