import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  // Form state
  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
  });

  // Fetch movies from backend
  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Load movies on page load
  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add movie
  const addMovie = async () => {
    try {
      await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          releaseYear: Number(form.releaseYear),
          rating: Number(form.rating),
        }),
      });

      // Clear form
      setForm({
        title: "",
        genre: "",
        releaseYear: "",
        rating: "",
      });

      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // DELETE movie
  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
      });

      fetchMovies(); // refresh list
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🎬 Movie Tracker</h1>

      {/* Add Movie Form */}
      <h2>Add Movie</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px" }}
      />
      <br /><br />

      <input
        name="genre"
        placeholder="Genre"
        value={form.genre}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px" }}
      />
      <br /><br />

      <input
        name="releaseYear"
        placeholder="Year"
        value={form.releaseYear}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px" }}
      />
      <br /><br />

      <input
        name="rating"
        placeholder="Rating"
        value={form.rating}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px" }}
      />
      <br /><br />

      <button
        onClick={addMovie}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Movie
      </button>

      <hr />

      {/* Movie List */}
      <h2>Movies</h2>

      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        movies.map((movie) => (
          <div
            key={movie._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Year: {movie.releaseYear}</p>
            <p>Rating: {movie.rating}</p>

            <button
              onClick={() => deleteMovie(movie._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;