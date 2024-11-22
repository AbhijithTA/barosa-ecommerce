import express from "express";
import { serviceHandler } from "../services/serviceHandler.js";
import { test } from "../services/user.js";
const router = express.Router();


//user tes
router.get("/test", serviceHandler(test))


const userRoutes = router
export default userRoutes;