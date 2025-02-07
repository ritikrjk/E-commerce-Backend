import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//removed the exposed uri
if (!process.env.MONGODB_URI) {
  throw new Error("Please provide mongodb uri in .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Mongodb connect error", error);
    process.exit(1);
  }
}

export default connectDB;
