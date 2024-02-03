import mongoose, { } from "mongoose";

const informationchema = mongoose.Schema({
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

const Information = mongoose.model.informations || mongoose.model('information', informationchema);

export default Information