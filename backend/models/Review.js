import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Review", reviewSchema);