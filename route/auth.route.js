import express from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import verifySession from "../middleware/verifySession.js";

const authRouter = express.Router();

//SIGN-UP
authRouter.post("/sign-up", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Enter name, email and password",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response
        .status(400)
        .json({ msg: "User with same email already exists! " });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    response.status(200).json({
      msg: "User registered Succesfully",
    });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});

//LOG-IN
authRouter.post("/sign-in", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Enter email and password to Login",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).json({
        msg: "No User with this email exists",
      });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return response.status(400).json({
        msg: "Wrong Password",
      });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey", {});

    user.token = token;
    await user.save();

    return response.status(200).json({
      msg: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
        role: user.type,
        cart: user.cart,
      },
    });
  } catch (error) {
    return response.status(500).json({ error: error.message || error });
  }
});

//LOGOUT
authRouter.post("/logout", async (request, response) => {
  try {
    const token = request.header("token");

    if (!token) {
      return response.status(400).json({ message: "Invalid User" });
    }

    // Find the user by token
    const user = await User.findOne({ token });
    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    // Clear the token field
    user.token = "";
    await user.save();

    return response.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    return response
      .status(500)
      .json({ error: error.message || "An unexpected error occurred." });
  }
});

//SESSION-PERSISTANCE
authRouter.post("/", verifySession, (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(400).json({
      message: "Invalid User",
    });
  }

  return response.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: user.token,
      role: user.type,
      cart: user.cart,
    },
  });
});

export default authRouter;
