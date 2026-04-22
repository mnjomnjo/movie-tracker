export default function MovieForm({
  form,
  onChange,
  onSubmit,
  editingId,
  onCancel,
}) {
  return (
    <div>
      <h2>{editingId ? "Edit Movie" : "Add Movie"}</h2>

      <input name="title" value={form.title} onChange={onChange} placeholder="Title" />
      <input name="genre" value={form.genre} onChange={onChange} placeholder="Genre" />
      <input name="releaseYear" value={form.releaseYear} onChange={onChange} placeholder="Year" />
      <input name="rating" value={form.rating} onChange={onChange} placeholder="Rating" />

      <button onClick={onSubmit}>
        {editingId ? "Update" : "Add"}
      </button>

      {editingId && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}