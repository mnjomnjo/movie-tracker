import Review from "../models/Review.js";
import Movie from "../models/Movie.js";

// CREATE a new review
export const createReview = async (req, res) => {
  try {
    const { userId, movieId, score, comment } = req.body;

    // Validate required fields
    if (!userId || !movieId || score == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate score range
    if (score < 0 || score > 10) {
      return res.status(400).json({ message: "Score must be between 0 and 10" });
    }

    // Check if movie exists
    const movieExists = await Movie.findById(movieId);
    if (!movieExists) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Prevent duplicate review from same user for same movie
    const existingReview = await Review.findOne({ userId, movieId });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this movie" });
    }

    const review = new Review({
      userId,
      movieId,
      score,
      comment,
    });

    const savedReview = await review.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create review",
      error: error.message,
    });
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
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// UPDATE a review (FIXED)
export const updateReview = async (req, res) => {
  try {
    const { score, comment } = req.body;

    const updateData = {};

    if (score != null) {
      if (score < 0 || score > 10) {
        return res.status(400).json({ message: "Score must be between 0 and 10" });
      }
      updateData.score = score;
    }

    if (comment) updateData.comment = comment;

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update review",
      error: error.message,
    });
  }
};

// DELETE a review
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

// GET review statistics (IMPROVED with movie info)
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
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: "$movie",
      },
      {
        $project: {
          movieId: "$_id",
          title: "$movie.title",
          averageScore: 1,
          totalReviews: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch review stats",
      error: error.message,
    });
  }
};