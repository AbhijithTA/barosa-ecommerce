import mongoose from "mongoose";
import Category from "./categories.js";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
