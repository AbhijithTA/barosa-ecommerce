import express from "express";
import { serviceHandler } from "../services/serviceHandler.js";
import { create_New_User, Login_User, test } from "../services/user.js";
const router = express.Router();



//login
router.post("/login", serviceHandler(Login_User))

//user tes
router.get("/test", serviceHandler(test))
router.post("/create-user", serviceHandler(create_New_User))


const userRoutes = router
export default userRoutes;