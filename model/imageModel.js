import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    length: { type: Number, required: true },
    chunkSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    aliases: [String]
}, {
    timestamps: true,
});

const Image = mongoose.model.images || mongoose.model('image', imageSchema);

export default Image;
