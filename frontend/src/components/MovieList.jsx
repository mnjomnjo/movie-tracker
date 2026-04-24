import { useState } from "react";
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

  // 🔍 Apply filter
  const handleFilter = () => {
    onFilter({
      genre,
      rating: rating ? Number(rating) : undefined,
    });
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
  if (error) return <p style={{ ...styles.center, color: "red" }}>{error}</p>;

  return (
    <div>
      {/* 🔍 Filter Section */}
      <div style={styles.filter}>
        <input
          type="text"
          placeholder="Filter by genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Min rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={styles.input}
        />

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
               animationDelay: `${index * 0.1}s`, // 🔥 stagger effect
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
    minWidth: "120px",
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