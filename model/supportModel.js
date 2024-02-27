import mongoose, { Schema } from "mongoose";

const supportSchema = mongoose.Schema({
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
    images:
    {
        type: String
    },
}, {
    timestamps: true,
});

const Support = mongoose.model.supports || mongoose.model('support', supportSchema);

export default Support