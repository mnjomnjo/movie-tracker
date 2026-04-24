import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

/**
 * CREATE a new movie
 */
export const createMovie = async (req, res) => {
  try {
    let { title, genre, rating, releaseYear, director } = req.body;

    // ✅ Trim strings (important)
    title = title?.trim();
    genre = genre?.trim();
    director = director?.trim();

    // ✅ Convert to numbers safely
    rating = Number(rating);
    releaseYear = Number(releaseYear);

    // ✅ Validation
    if (!title || !genre || !director) {
      return res.status(400).json({
        message: "Title, genre and director are required",
      });
    }

    if (isNaN(rating) || isNaN(releaseYear)) {
      return res.status(400).json({
        message: "Rating and release year must be valid numbers",
      });
    }

    if (rating < 0 || rating > 10) {
      return res.status(400).json({
        message: "Rating must be between 0 and 10",
      });
    }

    // ✅ Create movie
    const movie = new Movie({
      title,
      genre,
      rating,
      releaseYear,
      director,
    });

    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create movie",
      error: error.message,
    });
  }
};

/**
 * GET all movies with optional filtering
 */
export const getMovies = async (req, res) => {
  try {
    const { genre, rating, releaseYear } = req.query;

    let query = {};

    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    if (releaseYear) {
      query.releaseYear = Number(releaseYear);
    }

   const movies = await Movie.find(query).sort({ releaseYear: -1, createdAt: -1 })

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

/**
 * GET a single movie by ID
 */
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movie",
      error: error.message,
    });
  }
};

/**
 * UPDATE an existing movie
 */
export const updateMovie = async (req, res) => {
  try {
    let { title, genre, rating, releaseYear, director } = req.body;

    const updateData = {};

    if (title) updateData.title = title.trim();
    if (genre) updateData.genre = genre.trim();
    if (director) updateData.director = director.trim();

    if (rating != null) {
      rating = Number(rating);

      if (isNaN(rating) || rating < 0 || rating > 10) {
        return res.status(400).json({
          message: "Rating must be between 0 and 10",
        });
      }

      updateData.rating = rating;
    }

    if (releaseYear) {
      releaseYear = Number(releaseYear);

      if (isNaN(releaseYear)) {
        return res.status(400).json({
          message: "Release year must be a number",
        });
      }

      updateData.releaseYear = releaseYear;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update movie",
      error: error.message,
    });
  }
};

/**
 * DELETE a movie and its related reviews (cascade delete)
 */
export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Review.deleteMany({ movieId });

    res.status(200).json({
      message: "Movie and its reviews deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete movie",
      error: error.message,
    });
  }
};

/**
 * GET top-rated movies (rating >= 8)
 */
export const getTopRatedMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ rating: { $gte: 8 } }).sort({
      rating: -1,
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch top rated movies",
      error: error.message,
    });
  }
};

/**
 * GET all reviews for a specific movie
 */
export const getMovieReviews = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviews = await Review.find({ movieId: req.params.id })
      .populate("userId", "name email");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};