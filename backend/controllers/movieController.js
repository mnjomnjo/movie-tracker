import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

// CREATE movie
export const createMovie = async (req, res) => {
  try {
    const { title, genre, rating, releaseYear } = req.body;

    if (!title || !genre || !rating || !releaseYear) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const movie = new Movie(req.body);
    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all movies with optional filters
export const getMovies = async (req, res) => {
  try {
    const { genre, rating, year } = req.query;
    let query = {};

    if (genre) query.genre = { $regex: genre, $options: "i" };
    if (rating) query.rating = { $gte: Number(rating) };
    if (year) query.releaseYear = Number(year);

    const movies = await Movie.find(query).sort({ releaseYear: -1 });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE movie
export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE movie
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET top rated movies (rating >= 8)
export const getTopRatedMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ rating: { $gte: 8 } }).sort({
      rating: -1,
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET reviews for a specific movie (relational endpoint)
export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id })
      .populate("userId", "name email");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};