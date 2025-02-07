import express from "express";

import Product from "../models/product.model.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const adminRouter = express.Router();

// Add product
adminRouter.post("/add-product", adminMiddleware, async (request, response) => {
  try {
    const { name, description, images, quantity, price, category } =
      request.body;

    // Validate request body
    if (!name || !description || !images || !quantity || !price || !category) {
      return response.status(400).json({ error: "All fields are required." });
    }

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

export default adminRouter;
