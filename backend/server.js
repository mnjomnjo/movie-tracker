import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 🔥 Import routes
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ ADD AUTH

/**
 * 📁 Fix __dirname for ES Modules
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 🔥 Load environment variables from .env file
 */
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

/**
 * 🌐 CORS Configuration
 * Allow frontend (Vite) to communicate with backend
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/**
 * 📦 Parse incoming JSON requests
 */
app.use(express.json());

/**
 * 🔍 Debug Middleware (logs all requests)
 */
app.use((req, res, next) => {
  console.log("👉 METHOD:", req.method);
  console.log("👉 URL:", req.url);
  next();
});

/**
 * 📌 API Routes
 */
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes); // ✅ ADD AUTH ROUTES

/**
 * 🏠 Root Route
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * ❌ Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

/**
 * 🔗 Connect to MongoDB and start server
 */
const PORT = process.env.PORT || 5000;

// 🔍 Debug: Check if Mongo URI exists
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Check your .env file");
  process.exit(1);
}

// 🔥 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    // 🚀 Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });