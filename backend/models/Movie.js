import mongoose from "mongoose";

// 🎬 Movie Schema with strong validation
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"], // must exist
      trim: true,
      minlength: [2, "Title must be at least 2 characters"], // prevent short titles
      maxlength: [100, "Title cannot exceed 100 characters"], // prevent long titles
    },

    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      enum: {
        values: [
          "Action",
          "Drama",
          "Comedy",
          "Horror",
          "Sci-Fi",
          "Romance",
          "Fantasy",
          "Thriller",
          "Adventure",
          "Animation",
        ],
        message: "Invalid genre selected", // custom error message
      },
    },

    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
      min: [1888, "Movies did not exist before 1888"], // first movie ever
      max: [
        new Date().getFullYear(),
        "Release year cannot be in the future",
      ],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
      max: [10, "Rating cannot exceed 10"],
    },

    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
      minlength: [2, "Director name too short"],
    },

    // ⭐ Optional description (extra quality)
    description: {
      type: String,
      maxlength: [500, "Description too long"],
    },

    // 👤 Relation with User (VERY important for lab)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// 🚀 Export model
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;