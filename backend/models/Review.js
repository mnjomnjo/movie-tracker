import mongoose from "mongoose";
import "./User.js";   // Ensures User model is registered in mongoose
import "./Movie.js";  // Ensures Movie model is registered in mongoose

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      min: 0,
      max: 10,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "Movie reference is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Optional: Prevent duplicate reviews (one review per user per movie)
reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);