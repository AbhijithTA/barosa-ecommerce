import mongoose from "mongoose";
import subCategory from "./subCategories.js";
;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offerPrice: {
    type: Number,
    validate: {
      validator: function (value) {
        return value <= this.price;
      },
      message: "Offer price should be less than or equal to the actual price",
    },
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: subCategory,
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
        default: "",
      },
    },
  ],
  brand: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  variants: [
    {
      size: {
        type: String,
        required: true,
      },
      colour: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        min: 0,
      },
      sku: {
        type: String,
        unique: true,
        required: true,
      },
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Rating,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
