import mongoose, { } from "mongoose";

const visitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    device: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Visit = mongoose.model.visits || mongoose.model('visit', visitSchema);

export default Visit