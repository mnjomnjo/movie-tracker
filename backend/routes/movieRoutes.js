import express from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getTopRatedMovies,
  getMovieReviews 
} from "../controllers/movieController.js";

const router = express.Router();

/**
 * @route   POST /api/movies
 */
router.post("/", createMovie);

/**
 * @route   GET /api/movies/top-rated
 */
router.get("/top-rated", getTopRatedMovies);

/**
 * 🔥 NEW RELATIONAL ENDPOINT
 * @route   GET /api/movies/:id/reviews
 */
router.get("/:id/reviews", getMovieReviews);

/**
 * @route   GET /api/movies
 */
router.get("/", getMovies);

/**
 * @route   GET /api/movies/:id
 */
router.get("/:id", getMovieById);

/**
 * @route   PUT /api/movies/:id
 */
router.put("/:id", updateMovie);

/**
 * @route   DELETE /api/movies/:id
 */
router.delete("/:id", deleteMovie);

export default router;