import mongoose, { } from "mongoose";

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
    images: [
        {
            type: String
        }
    ],
}, {
    timestamps: true,
});

const SpiritualMS = mongoose.model.spirituals || mongoose.model('spiritual', spiritualSchema);

export default SpiritualMS