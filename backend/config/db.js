import mongoose from "mongoose";

const connectDB =  () => {
  const url = process.env.MONGO_URI;
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.log("Error while connected to database");
    });
};

const database = {
  connectDB
};

export default database;
