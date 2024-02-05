import mongoose, { } from "mongoose";

const apostolateSchema = mongoose.Schema({
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
}, {
    timestamps: true,
});

const Apostolate = mongoose.model.apostolates || mongoose.model('apostolate', apostolateSchema);

export default Apostolate