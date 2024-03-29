import mongoose, { Schema } from "mongoose";

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

const Information = mongoose.model.information || mongoose.model('information', informationchema);

export default Information