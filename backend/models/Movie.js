import mongoose from "mongoose";

// Define the schema for movies
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Movie must have a title
  },
  genre: {
    type: String,
    required: true, // Movie must have a genre
  },
  releaseYear: {
    type: Number,
    required: true, // Movie must have release year
  },
  rating: {
    type: Number,
    min: 1,
    max: 10, // Rating between 1 and 10
  },
});

// Create the model
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;