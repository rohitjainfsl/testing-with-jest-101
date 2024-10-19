// server.js
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Product from "./models/product.js";
import User from "./models/user.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Add Product route
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json({ message: "Product Added" });
  } catch (error) {
    console.log(error);
  }
});

// Fetch Products route
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

// Delete product route
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    await Product.findByIdAndDelete(product._id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
  }
});

// // Register route
// app.post("/register", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = new User({
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     await user.save();
//     res.status(201).send("User registered successfully");
//   } catch (error) {
//     res.status(500).send("Error registering user");
//   }
// });

// Login route
// app.post("/login", async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });
//   if (user == null) {
//     return res.status(400).send("Cannot find user");
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       res.json({ accessToken: accessToken });
//     } else {
//       res.send("Not Allowed");
//     }
//   } catch {
//     res.status(500).send();
//   }
// });

// Add post route
// app.post("/posts", authenticateToken, async (req, res) => {
//   const post = new Post({
//     title: req.body.title,
//     body: req.body.body,
//     author: req.user.id,
//   });
//   try {
//     const newPost = await post.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
