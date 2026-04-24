import express from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getTopRatedMovies,
  getMovieReviews,
} from "../controllers/movieController.js";

const router = express.Router();

/**
 * Base route: /api/movies
 */

/**
 * @route   POST /
 * @desc    Create a new movie
 */
router.post("/", createMovie);

/**
 * @route   GET /top-rated
 * @desc    Get top rated movies (rating >= 8)
 */
router.get("/top-rated", getTopRatedMovies);

/**
 * @route   GET /:id/reviews
 * @desc    Get all reviews for a specific movie (relational endpoint)
 */
router.get("/:id/reviews", getMovieReviews);

/**
 * @route   GET /
 * @desc    Get all movies with optional filters (genre, rating, year)
 */
router.get("/", getMovies);

/**
 * @route   GET /:id
 * @desc    Get a single movie by ID
 */
router.get("/:id", getMovieById);

/**
 * @route   PUT /:id
 * @desc    Update a movie by ID (full update)
 */
router.put("/:id", updateMovie);

/**
 * @route   DELETE /:id
 * @desc    Delete a movie by ID
 */
router.delete("/:id", deleteMovie);

export default router;