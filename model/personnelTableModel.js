import mongoose, { } from "mongoose";

const personnelTableSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
});

const PersonnelTable = mongoose.model.tables || mongoose.model('table', personnelTableSchema);

export default PersonnelTable