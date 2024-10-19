// __tests__/ecommerceApi.test.js

import mongoose from "mongoose";
import supertest from "supertest";
import app from "../index.js";
import Product from "../models/product.js";

const request = supertest(app);

describe("E-commerce API", () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await Product.deleteMany({});
  });

  describe("POST /api/products", () => {
    it("should add a new product", async () => {
      const newProduct = {
        name: "Test Product",
        price: 19.99,
        description: "This is a test product",
      };

      const response = await request
        .post("/api/products")
        .send(newProduct)
        .expect(201);

      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.price).toBe(newProduct.price);
      expect(response.body.description).toBe(newProduct.description);

      // Check if the product was actually saved to the database
      const savedProduct = await Product.findOne({ name: "Test Product" });
      expect(savedProduct).toBeTruthy();
    });

    it("should return 400 if required fields are missing", async () => {
      const invalidProduct = {
        name: "Invalid Product",
        // Missing price
      };

      await request.post("/api/products").send(invalidProduct).expect(400);
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete an existing product", async () => {
      // First, add a product
      const product = new Product({
        name: "Product to Delete",
        price: 29.99,
        description: "This product will be deleted",
      });
      await product.save();

      // Now, delete the product
      await request.delete(`/api/products/${product._id}`).expect(200);

      // Check if the product was actually deleted from the database
      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });

    it("should return 404 if product does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await request.delete(`/api/products/${nonExistentId}`).expect(404);
    });
  });

  describe("GET /api/products", () => {
    it("should fetch all products", async () => {
      // Add some test products
      const testProducts = [
        { name: "Product 1", price: 10.99, description: "Description 1" },
        { name: "Product 2", price: 20.99, description: "Description 2" },
        { name: "Product 3", price: 30.99, description: "Description 3" },
      ];

      await Product.insertMany(testProducts);

      // Fetch all products
      const response = await request.get("/api/products").expect(200);

      expect(response.body.length).toBe(3);
      expect(response.body[0].name).toBe("Product 1");
      expect(response.body[1].name).toBe("Product 2");
      expect(response.body[2].name).toBe("Product 3");
    });

    it("should return an empty array if no products exist", async () => {
      const response = await request.get("/api/products").expect(200);

      expect(response.body).toEqual([]);
    });
  });
});
