import mongoose, { } from "mongoose";

const userSessionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    session: {
        emun: ['in', 'out'],
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

const UserSession = mongoose.model.usersessions || mongoose.model('usersession', userSessionSchema);

export default UserSession