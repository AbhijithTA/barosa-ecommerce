//PACKAGES
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//UTILS
import database from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { loginRateLimiter } from "./middlewares/LoginRateLimiter.js";

dotenv.config();
const port = process.env.PORT || 5000;

database.connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(loginRateLimiter);

 app.use("/users", userRoutes);
 app.use("/admin", adminRoutes);




app.listen(port, () => console.log(`Server running on port: ${port}`));
