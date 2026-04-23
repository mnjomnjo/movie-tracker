export default function MovieCard({ movie, onDelete, onEdit }) {
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>🎭 {movie.genre}</p>
      <p>📅 {movie.releaseYear}</p>
      <p>⭐ {movie.rating}</p>

      {/* 🔥 NEW */}
      <p>🎬 {movie.director}</p>

      <button onClick={() => onEdit(movie)}>Edit</button>
      <button onClick={() => onDelete(movie._id)}>Delete</button>
    </div>
  );
}