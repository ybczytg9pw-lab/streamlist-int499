import { useState, useEffect } from 'react';
import StreamListForm from '../components/StreamListForm.jsx';
export default function StreamListPage() {

// Load saved movies when the application starts
const [movies, setMovies] = useState(() => {

  try {
    const savedMovies = localStorage.getItem('streamlist-movies');

    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);

      return Array.isArray(parsedMovies) ? parsedMovies : [];
    }

    return [];

  } catch (error) {
    console.error('Error loading saved movies:', error);
    return [];
  }

});

// Automatically save movies whenever the list changes
useEffect(() => {

  localStorage.setItem(
    'streamlist-movies',
    JSON.stringify(movies)
  );

}, [movies]);

// Track which movie is being edited
const [editingId, setEditingId] = useState(null);

// Store the updated movie title
const [editingTitle, setEditingTitle] = useState("");

// Add a movie to the StreamList
function handleTitleSubmit(title) {

  const newMovie = {
    id: crypto.randomUUID(),
    title: title,
    completed: false
  };

  setMovies((previousMovies) => [
    ...previousMovies,
    newMovie
  ]);

  console.log('Movie added to StreamList:', title);
}


// Mark a movie as watched or not watched
function toggleWatched(id) {

  setMovies((previousMovies) =>
    previousMovies.map((movie) =>
      movie.id === id
        ? { ...movie, completed: !movie.completed }
        : movie
    )
  );

}  

// Delete a movie from the StreamList
function deleteMovie(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this movie?"
  );

  if (confirmDelete) {
    setMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== id)
    );
  }
}
// Start editing a movie title
function startEditing(movie) {
  setEditingId(movie.id);
  setEditingTitle(movie.title);
}

// Save the edited movie title
function saveEdit(id) {

  const updatedTitle = editingTitle.trim();

  if (!updatedTitle) {
    alert("Movie title cannot be empty.");
    return;
  }

  setMovies((previousMovies) =>
    previousMovies.map((movie) =>
      movie.id === id
        ? { ...movie, title: updatedTitle }
        : movie
    )
  );

  setEditingId(null);
  setEditingTitle("");
}

// Cancel editing
function cancelEdit() {
  setEditingId(null);
  setEditingTitle("");
}

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-pulse" /> YOUR WATCHLIST STARTS HERE</span>
          <h1>Good stories deserve <span>a place on your list.</span></h1>
          <p className="hero-description">Never lose track of that movie or show you’ve been meaning to watch. StreamList keeps the idea simple, all in one place.</p>
          <div className="hero-note"><span className="material-symbols-rounded" aria-hidden="true">auto_awesome</span> Built for your next movie night</div>
        </div>
        <div className="art-panel" aria-hidden="true">
          <div className="art-halo" />
          <div className="art-card art-card-back"><span className="material-symbols-rounded">local_movies</span><div className="art-skeleton narrow"/><div className="art-skeleton"/></div>
          <div className="art-card art-card-front"><div className="art-card-symbol"><span className="material-symbols-rounded">playlist_add_check</span></div><div className="art-skeleton narrow"/><div className="art-skeleton"/><div className="art-skeleton short"/><div className="art-check"><span className="material-symbols-rounded">check</span></div></div>
          <div className="art-spark art-spark-one">✦</div><div className="art-spark art-spark-two">✦</div>
        </div>
      </section>

      <section className="entry-panel" aria-labelledby="entry-heading">
        <div className="panel-heading"><div><span className="section-kicker">MANAGE YOUR WATCHLIST</span><h2 id="entry-heading">What's on your watchlist?</h2></div><span className="week-badge">WEEK 02</span></div>
        <p className="entry-description">Create your personal movie watchlist! Add movies or television shows, edit titles, mark them as watched, or remove them whenever you like. Your list will be saved automatically.</p>
        <StreamListForm onSubmitTitle={handleTitleSubmit} />
      
         <div className="watchlist-panel">

          <h2>My Watchlist</h2>

          <p>
            You have {movies.length} movie(s) on your list.
         </p>

  {movies.length === 0 ? (

    <p>Your watchlist is empty. Add your first movie!</p>

  ) : (

    <ul className="watchlist-items">

      {movies.map((movie) => (

        <li key={movie.id} className="watchlist-item">

  {editingId === movie.id ? (

  <input
    type="text"
    className="watchlist-edit-input"
    aria-label="Edit movie title"
    value={editingTitle}
    maxLength={120}
    onChange={(event) => setEditingTitle(event.target.value)}
  />

) : (
  <span className={movie.completed ? "watched-title" : ""}>
    {movie.title}
  </span>
)}

{editingId === movie.id ? (

  <>
    <button
      type="button"
      className="watchlist-action save-action"
      onClick={() => saveEdit(movie.id)}
    >
      <span className="material-symbols-rounded" aria-hidden="true">
        save
      </span>
      Save
    </button>

    <button
      type="button"
      className="watchlist-action"
      onClick={cancelEdit}
    >
      Cancel
    </button>
  </>

) : (

  <button
    type="button"
    className="watchlist-action edit-action"
    onClick={() => startEditing(movie)}
  >
    <span className="material-symbols-rounded" aria-hidden="true">
      edit
    </span>
    Edit
  </button>

)}

  <button
    type="button"
    className="watchlist-action"
    onClick={() => toggleWatched(movie.id)}>
    <span 
      className="material-symbols-rounded" 
      aria-hidden="true"
      >
      {movie.completed ? "undo" : "check_circle"}
    </span>

    {movie.completed ? "Not Watched" : "Watched"}

  </button>

  

   <button
     type="button"
     className="watchlist-action delete-action"
     onClick={() => deleteMovie(movie.id)}
>
  <span className="material-symbols-rounded"
    aria-hidden="true"
  >
    delete
  </span>

  Delete
</button>
</li>

      ))}

    </ul>

  )}

</div>
</section>

      <div className="info-strip"><span className="material-symbols-rounded" aria-hidden="true">lightbulb</span><strong>Helpful Tip:</strong> Your StreamList is automically saved.  You can return later and continue managing your movies!</div>
    </>
  );
}
