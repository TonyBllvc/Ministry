import mongoose, { } from "mongoose";

const featuredProductSchema = mongoose.Schema({
  _id: {
    // type: Schema.Types.ObjectId
    type: mongoose.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

}, {
  timestamps: true,
});

const FeaturedProduct = mongoose.model.featuredproducts || mongoose.model('featuredproduct', featuredProductSchema);

export default FeaturedProduct