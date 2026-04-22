import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

/**
 * @route   POST /api/movies
 * @desc    Add a new movie
 */
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/movies
 * @desc    Get all movies (with optional filters)
 * @query   genre, rating (minimum rating)
 */
router.get("/", async (req, res) => {
  try {
    const query = {};

    // Filter by genre (exact match)
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // Filter by minimum rating
    if (req.query.rating) {
      query.rating = { $gte: Number(req.query.rating) };
    }

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/movies/:id
 * @desc    Get a single movie by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/movies/:id
 * @desc    Delete a movie by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    // Check if movie exists
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/movies/:id
 * @desc    Update a movie by ID
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Return updated document
        runValidators: true // Apply schema validation on update
      }
    );

    // Check if movie exists
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;