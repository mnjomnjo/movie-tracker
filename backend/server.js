import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

/**
 * 📁 Fix __dirname (ESM)
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 🔥 FIX: Load .env from backend folder
 */
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

/**
 * 🔥 Middleware
 */

// ✅ CORS (frontend connection)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

/**
 * 🔍 Debug middleware (optional)
 */
app.use((req, res, next) => {
  console.log("👉 METHOD:", req.method);
  console.log("👉 URL:", req.url);
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

// 🔥 Debug
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Check your .env file");
  process.exit(1);
}

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