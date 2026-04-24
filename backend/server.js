import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

/**
 * 🔥 Middleware
 */

// Enable CORS
app.use(cors());

// Parse JSON body (VERY IMPORTANT)
app.use(express.json());

// Debug middleware (IMPORTANT for your case)
app.use((req, res, next) => {
  console.log("👉 METHOD:", req.method);
  console.log("👉 URL:", req.url);
  console.log("👉 BODY:", req.body); 
  next();
});

/**
 * 📌 Routes
 */
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

/**
 * 🏠 Root route
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * ❌ Global error handler
 */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

/**
 * 🔗 Connect to MongoDB + Start Server
 */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });