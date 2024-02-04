import mongoose, { } from "mongoose";

const formationSchema = mongoose.Schema({
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

const Formation = mongoose.model.formations || mongoose.model('formation', formationSchema);

export default Formation