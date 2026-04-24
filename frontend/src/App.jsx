import { useEffect, useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

const API_URL = "http://localhost:5000/api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
    director: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Fetch movies
  const fetchMovies = async (filters = {}) => {
    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams(filters).toString();
      const url = query ? `${API_URL}?${query}` : API_URL;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Server error");
      }

      setMovies(data);
    } catch (err) {
      setError(err.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // 📝 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✏️ Edit
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

  // 🔄 Reset
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

  // ✅ Submit
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
      fetchMovies();

      alert(
        isEditing
          ? "Movie updated successfully 🎉"
          : "Movie added successfully 🎉"
      );
    } catch (err) {
      setError(err.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Delete
  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchMovies();
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  const handleFilter = (filters) => {
    fetchMovies(filters);
  };

  return (
    <div style={styles.container}>
      {/* 🎬 Title */}
      <h1 style={styles.title}>🎬 My Movie Tracker</h1>
      <p style={styles.subtitle}>
        A simple app to manage and rate my favorite movies
      </p>

      {error && <p style={styles.error}>{error}</p>}

      <MovieForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingId={editingId}
        onCancel={resetForm}
      />

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