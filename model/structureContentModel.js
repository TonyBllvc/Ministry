import mongoose, { } from "mongoose";

const structureContentSchema = mongoose.Schema({
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

const StructureContent = mongoose.model.contstrucs || mongoose.model('contstruc', structureContentSchema);

export default StructureContent