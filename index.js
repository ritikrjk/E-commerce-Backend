import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import authRouter from "./route/auth.route.js";
import adminRouter from "./route/admin.route.js";
import userRouter from "./route/user.route.js";
import productRouter from "./route/product.route.js";
dotenv.config();

const app = express();

app.use(express.json());

const PORT = 3000 || 8080;

app.use("/api/user", authRouter);
app.use("/api/admin", adminRouter);
app.use(productRouter);
app.use(userRouter);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running", PORT);
    });
  })
  .catch((error) => {
    console.log("Failed to connect", error);
    process.exit(1);
  });
