import express from "express";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  getReviewStats,
} from "../controllers/reviewController.js";

const router = express.Router();

/**
 * Base route: /api/reviews
 */

/**
 * @route   POST /
 * @desc    Create a new review
 */
router.post("/", createReview);

/**
 * @route   GET /
 * @desc    Get all reviews with populated user and movie data
 */
router.get("/", getReviews);

/**
 * @route   GET /stats
 * @desc    Get review statistics (average score per movie)
 */
router.get("/stats", getReviewStats);

/**
 * @route   PUT /:id
 * @desc    Update a review by ID
 */
router.put("/:id", updateReview);

/**
 * @route   DELETE /:id
 * @desc    Delete a review by ID
 */
router.delete("/:id", deleteReview);

export default router;