import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index : true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    isDeleted:{
        type:Boolean,
        default:false
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ]
  },
  
);

const User = mongoose.model("User", userSchema);

export default User;



