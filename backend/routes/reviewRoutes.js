import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movieId", "title genre")
      .populate("userId", "name email");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;