import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

/**
 * @route   POST /api/reviews
 * @desc    Create new review
 */
router.post("/", async (req, res) => {
  try {
    const { userId, movieId, score } = req.body;

    // ✅ Validation (مهم جدًا)
    if (!userId || !movieId || !score) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const review = new Review(req.body);
    const savedReview = await review.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/reviews
 * @desc    Get all reviews with populated data
 */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movieId", "title genre")
      .populate("userId", "name email");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update review
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete review
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;