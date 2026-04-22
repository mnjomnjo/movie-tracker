// Import required packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/movies", movieRoutes); // Movie API routes

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected")) // Success message
  .catch((err) => console.error("MongoDB connection error:", err)); // Error handling

// Basic route to test API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define server port (use .env or fallback to 5000)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});