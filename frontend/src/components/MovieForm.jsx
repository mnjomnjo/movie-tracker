import { useState } from "react";

export default function MovieForm({
  form,
  onChange,
  onSubmit,
  editingId,
  onCancel,
}) {
  const [hover, setHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>
        {editingId ? "Edit Movie" : "Add Movie"}
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Title"
        required
        style={styles.input}
      />

      {/* Genre */}
      <select
        name="genre"
        value={form.genre}
        onChange={onChange}
        required
        style={styles.input}
      >
        <option value="">Select Genre</option>
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

      {/* Year */}
      <input
        name="releaseYear"
        value={form.releaseYear}
        onChange={onChange}
        placeholder="Year"
        type="number"
        min="1888"
        max={new Date().getFullYear()}
        style={styles.input}
      />

      {/* Rating */}
      <input
        type="number"
        name="rating"
        value={form.rating}
        onChange={onChange}
        placeholder="Rating (0-10)"
        min="0"
        max="10"
        required
        style={styles.input}
      />

      {/* Director */}
      <input
        type="text"
        name="director"
        value={form.director}
        onChange={onChange}
        placeholder="Director"
        required
        style={styles.input}
      />

      {/* Submit with hover */}
      <button
        type="submit"
        style={{
          ...styles.button,
          backgroundColor: hover ? "#45a049" : "#4CAF50",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {editingId ? "Update" : "Add"}
      </button>

      {/* Cancel */}
      {editingId && (
        <button
          type="button"
          onClick={onCancel}
          style={styles.cancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "320px",
    margin: "20px auto",
    marginBottom: "30px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // تحسين بسيط
  },

  title: {
    textAlign: "center",
  },

  input: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cancel: {
    padding: "8px",
    backgroundColor: "gray",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};