import express from "express";
import { serviceHandler } from "../services/serviceHandler.js";
import { add_subcategory_to_category, createCategory, createSubCategory } from "../services/admin.js";
const router = express.Router();

//subCategory
router.post("/subCategory-adding", serviceHandler(createSubCategory));



//category adding
router.post("/category-adding", serviceHandler(createCategory));
router.put("/add-subcategory", serviceHandler(add_subcategory_to_category));




const adminRoutes = router;
export default adminRoutes;
