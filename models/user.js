import  { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/ // Basic email validation
    },
    password: {
      type: String,
      required: true
    },
    subscription_type: {
      type: String,
      enum: ['monthly', 'annual'],
      default: 'monthly'
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", UserSchema);

export default User;


