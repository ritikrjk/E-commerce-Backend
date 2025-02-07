import express from "express";
import verifySession from "../middleware/verifySession.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
const userRouter = express.Router();

userRouter.post("/api/add-to-cart", verifySession, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(req.user);
    const existingCartItem = user.cart.find((item) =>
      item.product._id.equals(product._id)
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cart.push({ product, quantity: 1 });
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
    });
  }
});

userRouter.delete(
  "/api/remove-from-cart/:id",
  verifySession,
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      let user = await User.findById(req.user); // Use let so we can reassign later

      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          if (user.cart[i].quantity === 1) {
            user.cart.splice(i, 1);
          } else {
            user.cart[i].quantity -= 1;
          }
          // Optionally break here if each product is unique in the cart
          break;
        }
      }

      user = await user.save(); // Save updated user document
      res.json(user); // Send updated user back to the client
    } catch (error) {
      res.status(500).json({
        error: error.message || error,
      });
    }
  }
);

export default userRouter;
