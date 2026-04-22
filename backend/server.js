// Import required packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"; // Import review routes

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// API routes
app.use("/api/movies", movieRoutes); // Movie endpoints
app.use("/api/reviews", reviewRoutes); // Review endpoints

// Connect to MongoDB Atlas using MONGO_URI from environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route for testing the API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define server port (use .env or fallback to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});