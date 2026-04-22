export default function MovieCard({ movie, onDelete, onEdit }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>{movie.releaseYear}</p>
      <p>{movie.rating}</p>

      <button onClick={() => onEdit(movie)}>Edit</button>
      <button onClick={() => onDelete(movie._id)}>Delete</button>
    </div>
  );
}