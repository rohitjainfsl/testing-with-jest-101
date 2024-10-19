// __tests__/db.test.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

describe("MongoDB Connection", () => {
  beforeAll(async () => {
    // Ensure the connection is closed before each test suite run
    await mongoose.disconnect();
  });

  afterAll(async () => {
    // Close the connection after all tests are done
    await mongoose.disconnect();
  });

  test("connects to the local MongoDB database", async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const dbState = mongoose.connection.readyState;
    expect(dbState).toBe(1); // 1 means 'connected'
  });

  //YEH ZARURI NAHI HAI
  test("can perform database operations", async () => {
    // Ensure we're connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Define a simple schema
    const TestSchema = new mongoose.Schema({
      name: String,
    });

    // Create a model
    const TestModel = mongoose.model("Test", TestSchema);

    // Create a document
    const testDoc = new TestModel({ name: "test" });
    await testDoc.save();

    // Retrieve the document
    const retrievedDoc = await TestModel.findOne({ name: "test" });

    expect(retrievedDoc.name).toBe("test");

    // Clean up: remove the test document
    await TestModel.deleteOne({ name: "test" });
  });

  //YEH ZARURI NAHI HAI
  it("handles connection errors", async () => {
    // Attempt to connect with an invalid URI
    await expect(
      mongoose.connect("mongodb://invalid-uri:27017/test")
    ).rejects.toThrow();
  });
});
