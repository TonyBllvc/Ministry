import mongoose, { } from "mongoose";

const userSessionSchema = mongoose.Schema({
    userId: {
        // type: Schema.Types.ObjectId
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        emun: ['Admin', 'Author'],
        type: String,
        required: true
    },
    access: {
        emun: ['yes', 'no'],
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