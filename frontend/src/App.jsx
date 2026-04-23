import { useEffect, useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
    director: "", // 🔥 NEW
  });

  // 🆕 loading + error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();

    const interval = setInterval(fetchMovies, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const editMovie = (movie) => {
    setForm({
      title: movie.title,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      director: movie.director, // 🔥 NEW
    });

    setEditingId(movie._id);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editingId) {
        await fetch(`http://localhost:5000/api/movies/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            releaseYear: Number(form.releaseYear),
            rating: Number(form.rating),
          }),
        });
        setEditingId(null);
      } else {
        await fetch("http://localhost:5000/api/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            releaseYear: Number(form.releaseYear),
            rating: Number(form.rating),
          }),
        });
      }

      setForm({
        title: "",
        genre: "",
        releaseYear: "",
        rating: "",
        director: "", // 🔥 NEW
      });

      fetchMovies();
    } catch (err) {
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
      });

      fetchMovies();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>🎬 Movie Tracker</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <MovieForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingId={editingId}
        onCancel={() => {
          setEditingId(null);
          setForm({
            title: "",
            genre: "",
            releaseYear: "",
            rating: "",
            director: "", // 🔥 NEW
          });
        }}
      />

      <MovieList
        movies={movies}
        onDelete={deleteMovie}
        onEdit={editMovie}
      />
    </div>
  );
}

export default App;