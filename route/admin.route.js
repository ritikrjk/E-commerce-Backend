import express from "express";

import Product from "../models/product.model.js";
import adminMiddleware from "../middleware/adminmiddleware.js";
import Order from "../models/order.model.js";

const adminRouter = express.Router();

// Add product
adminRouter.post("/add-product", adminMiddleware, async (request, response) => {
  try {
    const { name, description, images, quantity, price, category } =
      request.body;
    console.log(request.body);

    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });

    product = await product.save();
    response.status(201).json(product);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Get all your products
adminRouter.get("/get-products", adminMiddleware, async (request, response) => {
  try {
    const products = await Product.find({});
    response.json(products);
  } catch (error) {
    response.status(500).json({ error: e.message });
  }
});

//Delete the product
adminRouter.post(
  "/delete-product",
  adminMiddleware,
  async (request, response) => {
    try {
      const { id } = request.body;
      let product = await Product.findByIdAndDelete(id);
      response.json(product);
    } catch (error) {
      response.status(500).json({ error: e.message });
    }
  }
);

adminRouter.get("/get-orders", adminMiddleware, async (request, response) => {
  try {
    const orders = await Order.find({});
    response.json(orders);
  } catch (error) {
    response.json({
      error: error.message || error,
    });
  }
});
export default adminRouter;
