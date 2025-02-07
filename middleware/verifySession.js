import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifySession = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied." });
    }

    const decoded = jwt.verify(token, "passwordKey");
    const user = await User.findById(decoded.id);

    if (!user || user.token !== token) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied." });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default verifySession;
