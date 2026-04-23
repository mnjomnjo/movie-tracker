import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
      min: 1888,
      max: new Date().getFullYear(),
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 10,
    },

    // 🔥 NEW: Custom Field
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;