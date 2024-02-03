import mongoose, { } from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true

  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  images: {
    type: String
  },
  brand_category: {
    type: mongoose.Types.ObjectId,
    ref: 'brand',
    required: true,
  },
  properties: [
    {
      type: Object
    }
  ]
  // category: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'category'
  // },
  // brand_category: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'brand'
  // },
  // images: [
  //   {
  //     type: String
  //   }
  // ],
  // images: [
  //   {
  //     data: Buffer,
  //     contentType: String,
  //   }
  // ],
  // //used fr gridFs
  // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
  // category: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'Category'
  // },
  // properties: {
  //   type: Object
  // },
}, {
  timestamps: true,
});
// productSchema.index({
//   title: 'text',
//   description: 'text',
//   brand_category: 'text'
// });

// productSchema.index({ price: 1 }); // Index for numeric field 'price'
// productSchema.index({ brand_category: 1 }); // Index for ObjectId field 'brand_category'

const Product = mongoose.model.products || mongoose.model('product', productSchema);

export default Product