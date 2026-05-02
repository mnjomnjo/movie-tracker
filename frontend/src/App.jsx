import { useEffect, useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

// API URL
const API_URL = "http://127.0.0.1:5000/api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Store active filters
  const [filters, setFilters] = useState({});

  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
    director: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Fetch movies from API
   * Supports optional filtering
   */
  const fetchMovies = async (filters = {}) => {
    try {
      setLoading(true);
      setError("");

      // Convert filters to query string
      const query = new URLSearchParams(filters).toString();
      const url = query ? `${API_URL}?${query}` : API_URL;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Server error");
      }

      setMovies(data);
    } catch (err) {
      console.error("FETCH ERROR 👉", err);
      setError("Failed to fetch movies ❌");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initial load + Auto-refresh
   * - Fetch movies when component mounts
   * - Re-fetch every 5 seconds
   * - Cleanup interval on unmount
   */
  useEffect(() => {
    // Initial fetch
    fetchMovies(filters);

    // Set interval for auto-refresh
    const interval = setInterval(() => {
      fetchMovies(filters);
    }, 5000);

    // Cleanup function (IMPORTANT)
    return () => {
      clearInterval(interval);
    };
  }, [filters]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit movie
  const editMovie = (movie) => {
    setForm({
      title: movie.title,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      director: movie.director,
    });
    setEditingId(movie._id);
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      genre: "",
      releaseYear: "",
      rating: "",
      director: "",
    });
  };

  /**
   * Create or Update movie
   */
  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.genre ||
      !form.rating ||
      !form.releaseYear ||
      !form.director
    ) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";

      const bodyData = {
        title: form.title.trim(),
        genre: form.genre,
        director: form.director.trim(),
        releaseYear: Number(form.releaseYear),
        rating: Number(form.rating),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Operation failed");
      }

      const isEditing = editingId;

      resetForm();

      // Refresh using current filters
      fetchMovies(filters);

      alert(
        isEditing
          ? "Movie updated successfully 🎉"
          : "Movie added successfully 🎉"
      );
    } catch (err) {
      console.error("SUBMIT ERROR 👉", err);
      setError("Operation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete movie
   */
  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      // Refresh using current filters
      fetchMovies(filters);
    } catch (err) {
      console.error("DELETE ERROR 👉", err);
      setError("Delete failed ❌");
    }
  };

  /**
   * Handle filtering
   */
  const handleFilter = (newFilters) => {
    setFilters(newFilters);      // Save filters
    fetchMovies(newFilters);     // Fetch filtered movies
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 My Movie Tracker</h1>
      <p style={styles.subtitle}>
        A simple app to manage and rate my favorite movies
      </p>

      {/* Error message */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Form */}
      <MovieForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingId={editingId}
        onCancel={resetForm}
      />

      {/* Movie list */}
      <MovieList
        movies={movies}
        onDelete={deleteMovie}
        onEdit={editMovie}
        loading={loading}
        error={error}
        onFilter={handleFilter}
      />
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "25px",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default App;