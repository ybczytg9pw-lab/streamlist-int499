import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Retrieve saved movie results
function getSavedMovies() {
  try {
    const saved = localStorage.getItem("movieResults");
    const data = saved ? JSON.parse(saved) : [];

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function MoviesPage() {

  const [search, setSearch] = useState(
    () => localStorage.getItem("movieSearch") || ""
  );

  const [movies, setMovies] = useState(getSavedMovies);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [watchlistMessage, setWatchlistMessage] = useState("");

  // Save search text to LocalStorage
  useEffect(() => {
    localStorage.setItem("movieSearch", search);
  }, [search]);

  // Save movie results to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "movieResults",
      JSON.stringify(movies)
    );
  }, [movies]);

  // Search movies using the TMDB API
  async function searchMovies(event) {
    event.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    if (!API_KEY) {
      setError("TMDB API key is missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const params = new URLSearchParams({
        api_key: API_KEY,
        query: search.trim()
      });

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?${params}`
      );

      if (!response.ok) {
        throw new Error(
          `Unable to retrieve movies. Error: ${response.status}`
        );
      }

      const data = await response.json();

      setMovies(data.results || []);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  }
// Add a TMDB movie to the existing StreamList watchlist
function addToWatchlist(movie) {

  try {

    // Get movies already saved in StreamList
    const savedMovies = localStorage.getItem('streamlist-movies');

    const parsedMovies = savedMovies
      ? JSON.parse(savedMovies)
      : [];

    const currentMovies = Array.isArray(parsedMovies)
      ? parsedMovies
      : [];

    // Check whether the movie is already saved
    const alreadyExists = currentMovies.some(
      (item) =>
        item.tmdbId === movie.id ||
        item.title?.trim().toLowerCase() ===
          movie.title.trim().toLowerCase()
    );

    if (alreadyExists) {
      setWatchlistMessage(
        `${movie.title} is already on your watchlist.`
      );
      return;
    }

    // Create a movie using the existing StreamList format
    const newMovie = {
      id: crypto.randomUUID(),
      title: movie.title,
      completed: false,
      tmdbId: movie.id
    };

    // Add the movie to the existing watchlist
    const updatedMovies = [
      ...currentMovies,
      newMovie
    ];

    // Save the updated watchlist
    localStorage.setItem(
      'streamlist-movies',
      JSON.stringify(updatedMovies)
    );

    // Display confirmation
    setWatchlistMessage(
      `${movie.title} added to your watchlist!`
    );

  } catch (error) {

    console.error('Error saving movie:', error);

    setWatchlistMessage(
      'Unable to save this movie. Please try again.'
    );

  }

}
  return (

    <div style={{ padding: "30px" }}>

      <h1>StreamList Movie Search</h1>

      <p>
        Search for your favorite movies using The Movie Database.
      </p>

      {/* Search Form */}

      <form onSubmit={searchMovies}>

        <input
          type="text"
          placeholder="Enter movie title"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            maxWidth: "100%",
            marginRight: "10px"
          }}
        />

        <button type="submit">
          Search Movies
        </button>

      </form>

      {loading && <p>Searching for movies...</p>}

      {error && <p role="alert">{error}</p>}

      {watchlistMessage && (
  <div
    role="status"
    style={{
      backgroundColor: "#123d30",
      color: "#ffffff",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "15px",
      marginBottom: "15px",
      fontWeight: "bold",
      border: "1px solid #38b27a"
    }}
  >
    ✅ {watchlistMessage}
  </div>
)}

      {/* Display Search Results */}

      <h2>Movie Results</h2>

      {movies.length === 0 && !loading && (
        <p>No movies to display.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        {movies.map((movie) => (

          <div
            key={movie.id}
            style={{
              border: "1px solid #45466e",
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#171c35"
            }}
          >

            <h3>{movie.title}</h3>

            {movie.poster_path && (

              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} poster`}
                style={{
                  width: "150px",
                  borderRadius: "8px"
                }}
              />

            )}

            <p>
              <strong>Release Date:</strong>{" "}
              {movie.release_date || "Not available"}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average?.toFixed(1) ?? "N/A"}
            </p>

            <p>
              {movie.overview || "No description available."}
            </p>
<button
  type="button"
  onClick={() => addToWatchlist(movie)}
  style={{
    marginTop: "15px",
    padding: "12px 20px",
    backgroundColor: "#8175f5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Add to My Watchlist
</button>
          </div>

        ))}

      </div>

      <p style={{ marginTop: "30px" }}>
        This product uses the TMDB API but is not
        endorsed or certified by TMDB.
      </p>

    </div>

  );
}