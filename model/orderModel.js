import mongoose, { } from "mongoose";

const orderSchema = mongoose.Schema({
  line_items: {
    type: Object,
    trim: true
  },
  name: {
    type: String,
    trim: true

  },
  city: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  postal: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'profile',
  },
  address: {
    type: String
  },
  country: {
    type: String,
  },
  paid: {
    type: Boolean,
  }
}, {
  timestamps: true,
});

const Order = mongoose.model.orders || mongoose.model('order', orderSchema);

export default Order