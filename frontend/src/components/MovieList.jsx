import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList({
  movies,
  onDelete,
  onEdit,
  loading,
  error,
  onFilter,
}) {
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  // 🔁 Auto-refresh using interval
  useEffect(() => {
    // Call filter (or fetch) every 5 seconds to refresh data
    const interval = setInterval(() => {
      onFilter({}); // fetch all movies again (no filters)
    }, 5000);

    // 🧹 Cleanup to prevent memory leaks
    return () => {
      clearInterval(interval);
    };
  }, [onFilter]);

  // 🔍 Filter (genre + rating)
  const handleFilter = () => {
    const filters = {};

    if (genre) {
      filters.genre = genre;
    }

    if (rating !== "") {
      filters.rating = Number(rating);
    }

    onFilter(filters);
  };

  // 🔄 Reset filters
  const handleReset = () => {
    setGenre("");
    setRating("");
    onFilter({});
  };

  // ⏳ Loading state
  if (loading) return <p style={styles.center}>Loading movies...</p>;

  // ❌ Error state
  if (error)
    return <p style={{ ...styles.center, color: "red" }}>{error}</p>;

  return (
    <div>
      {/* 🔍 Filter Section */}
      <div style={styles.filter}>
        {/* 🎯 Genre Dropdown */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={styles.input}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
        </select>

        {/* ⭐ Rating Input */}
        <input
          type="number"
          placeholder="Min rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={styles.input}
        />

        {/* 🔘 Buttons */}
        <button onClick={handleFilter} style={styles.button}>
          Filter
        </button>

        <button onClick={handleReset} style={styles.resetBtn}>
          Reset
        </button>
      </div>

      {/* 📭 Empty state */}
      {!movies || movies.length === 0 ? (
        <p style={styles.center}>No movies found.</p>
      ) : (
        <div className="grid">
          {movies.map((movie, index) => (
            <div
              key={movie._id || movie.id}
              className="card"
              style={{
                ...styles.cardWrapper,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <MovieCard
                movie={movie}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const styles = {
  center: {
    textAlign: "center",
    marginTop: "20px",
  },

  filter: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "140px",
  },

  button: {
    padding: "8px 14px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  resetBtn: {
    padding: "8px 14px",
    backgroundColor: "#777",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cardWrapper: {
    display: "flex",
    justifyContent: "center",
  },
};