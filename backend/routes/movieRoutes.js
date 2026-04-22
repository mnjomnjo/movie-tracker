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
 * @desc    Get all movies (filters + sorting)
 */
router.get("/", async (req, res) => {
  try {
    const query = {};

    // 🔥 Filter by genre (case-insensitive)
    if (req.query.genre) {
      query.genre = { $regex: req.query.genre, $options: "i" };
    }

    // 🔥 Filter by minimum rating
    if (req.query.rating) {
      query.rating = { $gte: Number(req.query.rating) };
    }

    // 🔥 NEW: Sort by newest year first
    const movies = await Movie.find(query).sort({ releaseYear: -1 });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/movies/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/movies/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/movies/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;