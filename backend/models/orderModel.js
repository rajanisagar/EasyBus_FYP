
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
       
        seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
        seatId: { type: String, required: true },
        price: { type: Number },
        // buss === product
        bus: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bus',
          
        },
      },
    ],
    userDetails: {
      fullName: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    paymentMethod: { type: String },
    // itemsPrice: { type: Number },
    // shippingPrice: { type: Number },
    // taxPrice: { type: Number },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    // isDelivered: { type: Boolean, default: false },
    // deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;