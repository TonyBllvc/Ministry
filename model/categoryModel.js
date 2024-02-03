import mongoose, { } from "mongoose";

const categorySchema = mongoose.Schema({
    cat: {
        type: String,
        required: true
    },
});

const Category = mongoose.model.categories || mongoose.model('category', categorySchema);

export default Category

// So every products with the id's that contain the first category id will be passed first, and passed in a res.json by the 