import MovieCard from "./MovieCard";

export default function MovieList({ movies, onDelete, onEdit }) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}