import express from "express";
import { serviceHandler } from "../services/serviceHandler.js";
import { create_New_User, get_category_subcategory, Login_User, test } from "../services/user.js";
const router = express.Router();



//login
router.post("/login", serviceHandler(Login_User))


//user creation
router.post("/create-user", serviceHandler(create_New_User))

//category and subcategory getting
router.get("/category-subcategory-getting", serviceHandler(get_category_subcategory))


const userRoutes = router
export default userRoutes;