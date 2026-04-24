export default function MovieCard({ movie, onDelete, onEdit, delay = 0 }) {
  return (
    <div
      style={{
        ...styles.card,
        animation: `fadeInUp 0.5s ease ${delay * 0.1}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
    >
      <h3 style={styles.title}>{movie.title}</h3>

      <p>🎭 Genre: {movie.genre}</p>
      <p>📅 Year: {movie.releaseYear}</p>
      <p>⭐ Rating: {movie.rating}</p>
      <p>🎬 Director: {movie.director}</p>

      <div style={styles.buttons}>
        <button
          style={styles.editBtn}
          onClick={() => onEdit(movie)}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Edit
        </button>

        <button
          style={styles.deleteBtn}
          onClick={() => onDelete(movie._id)}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: "16px",
    padding: "15px",
    margin: "10px",
    width: "260px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },

  title: {
    marginBottom: "10px",
    color: "#2c3e50",
    fontWeight: "600",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  editBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  },

  deleteBtn: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  },
};