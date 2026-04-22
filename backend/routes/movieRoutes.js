import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// POST: Add new movie
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Get all movies (with optional filters)
router.get("/", async (req, res) => {
  try {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    if (req.query.rating) {
      query.rating = { $gte: Number(req.query.rating) };
    }

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: get single movie by ID
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



// DELETE: delete a movie by ID
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: update a movie by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;