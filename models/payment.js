import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  transactionId: {
    type: String,
    unique: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  plan_id: {
    type: Schema.Types.ObjectId,
    ref: "SubscriptionPlan",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["success", "pending", "failed"],
    default: "pending"
  }
},{
  timestamps:true
});

const Payment = model("Payment", paymentSchema);
export default Payment;
