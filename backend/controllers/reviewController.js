import Review from "../models/Review.js";

// CREATE review
export const createReview = async (req, res) => {
  try {
    const { userId, movieId, score } = req.body;

    if (!userId || !movieId || !score) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const review = new Review(req.body);
    const savedReview = await review.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all reviews with populated user and movie data
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movieId", "title genre")
      .populate("userId", "name email");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE review
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE review
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET average rating stats per movie (aggregation)
export const getReviewStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: "$movieId",
          averageScore: { $avg: "$score" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};