import express, { response } from "express";
import verifySession from "../middleware/verifySession.js";
import Product from "../models/product.model.js";

const productRouter = express.Router();

//get products by their category
productRouter.get("/api/products", verifySession, async (request, response) => {
  try {
    console.log(request.category);
    const products = await Product.find({ category: request.query.category });
    response.json(products);
  } catch (error) {
    response.status(500).json({
      error: error.message || error,
    });
  }
});

//search a product 
productRouter.get(
  "/api/products/search/:name",
  verifySession,
  async (request, response) => {
    try {
      console.log(request.params.name);
      const product = await Product.find({
        name: { $regex: request.params.name, $options: "i" },
      });
      response.json(product);
    } catch (error) {
      return response.status(500).json({
        error: error.message || error,
      });
    }
  }
);

// rate a product
productRouter.post("/api/rate-product", verifySession, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.rating.length; i++) {
      if (product.rating[i].userId == req.user) {
        product.rating.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.rating.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

//deal of day
productRouter.get("/api/deal-of-day", verifySession, async (req, res) => {
  try {
    let products = await Product.find({});

    products = products.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating;
      }

      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }
      return aSum < bSum ? 1 : -1;
    });

    res.json(products[0]);
    
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

export default productRouter;
