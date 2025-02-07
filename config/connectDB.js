import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_DB_URI =
  "mongodb+srv://newaddress445:gIvJCXcpQUDN8196@cluster0.sawpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
