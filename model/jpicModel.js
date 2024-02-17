import mongoose, { Schema } from "mongoose";

const jpicSchema = mongoose.Schema({
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

const Jpic = mongoose.model.jpics || mongoose.model('jpic', jpicSchema);

export default Jpic