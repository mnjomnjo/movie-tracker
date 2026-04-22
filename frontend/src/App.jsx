import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
  });

  const fetchMovies = async () => {
    const res = await fetch("http://localhost:5000/api/movies");
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🆕 EDIT
  const editMovie = (movie) => {
    setForm({
      title: movie.title,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
    });

    setEditingId(movie._id);
  };

  // 🆕 ADD OR UPDATE
  const addMovie = async () => {
    if (editingId) {
      // UPDATE
      await fetch(`http://localhost:5000/api/movies/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          releaseYear: Number(form.releaseYear),
          rating: Number(form.rating),
        }),
      });

      setEditingId(null);
    } else {
      // ADD
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
    }

    // reset form
    setForm({
      title: "",
      genre: "",
      releaseYear: "",
      rating: "",
    });

    fetchMovies();
  };

  const deleteMovie = async (id) => {
    await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    });

    fetchMovies();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Movie Tracker</h1>

      {/* FORM */}
      <div style={styles.form}>
        <h2>{editingId ? "Edit Movie" : "Add Movie"}</h2>

        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} style={styles.input}/>
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} style={styles.input}/>
        <input name="releaseYear" placeholder="Year" value={form.releaseYear} onChange={handleChange} style={styles.input}/>
        <input name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} style={styles.input}/>

        <button onClick={addMovie} style={styles.addBtn}>
          {editingId ? "Update Movie" : "Add Movie"}
        </button>

        {/* 🆕 Cancel button */}
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({
                title: "",
                genre: "",
                releaseYear: "",
                rating: "",
              });
            }}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
        )}
      </div>

      {/* LIST */}
      <h2 style={{ textAlign: "center" }}>Movies</h2>

      <div style={styles.grid}>
        {movies.map((movie) => (
          <div key={movie._id} style={styles.card}>
            <h3>{movie.title}</h3>
            <p>🎭 {movie.genre}</p>
            <p>📅 {movie.releaseYear}</p>
            <p>⭐ {movie.rating}</p>

            {/* 🆕 EDIT BUTTON */}
            <button
              onClick={() => editMovie(movie)}
              style={styles.editBtn}
            >
              Edit
            </button>

            <button
              onClick={() => deleteMovie(movie._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  addBtn: {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  },
  editBtn: {
    marginTop: "10px",
    backgroundColor: "orange",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    marginRight: "5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  deleteBtn: {
    marginTop: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
};

export default App;