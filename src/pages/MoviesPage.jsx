import { useState, useEffect, useRef } from "react";
import { useWatchlist } from "../context/WatchlistContext.jsx";

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
  const { movies: watchlist, setMovies: setWatchlist } = useWatchlist();

  const [search, setSearch] = useState(
    () => localStorage.getItem("movieSearch") || ""
  );

  const [movies, setMovies] = useState(getSavedMovies);

  const [loading, setLoading] = useState(false);
  const latestRequestId = useRef(0);

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

  const requestId = ++latestRequestId.current;
  const searchTerm = search.trim();

  setWatchlistMessage("");

  if (!searchTerm) {
    setLoading(false);
    setError("Please enter a movie title.");
    return;
  }

  if (!API_KEY) {
    setLoading(false);
    setError("TMDB API key is missing.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      query: searchTerm
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?${params}`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Movie search is temporarily unavailable due to an authentication issue.");
      }

      throw new Error(`Unable to retrieve movies. Error: ${response.status}`);
    }

    const data = await response.json();

    if (requestId !== latestRequestId.current) return;

    setMovies(Array.isArray(data.results) ? data.results : []);

  } catch (error) {
    if (requestId !== latestRequestId.current) return;

    if (error instanceof TypeError) {
      setError("Cannot reach the movie service. Please check your internet connection.");
    } else {
      setError(error.message);
    }

  } finally {
    if (requestId === latestRequestId.current) {
      setLoading(false);
    }
  }
}
// Add a TMDB movie to the existing StreamList watchlist
function addToWatchlist(movie) {

  // Validate the movie before adding it
  const movieTitle =
    typeof movie?.title === "string"
      ? movie.title.trim()
      : "";

  if (!movieTitle) {
    setWatchlistMessage(
      "This movie does not have a valid title."
    );
    return;
  }

  // Check whether the movie already exists
  const alreadyExists = watchlist.some(
    (item) =>
      (movie.id != null && item.tmdbId === movie.id) ||
      item.title?.trim().toLowerCase() ===
        movieTitle.toLowerCase()
  );

  if (alreadyExists) {
    setWatchlistMessage(
      `${movieTitle} is already on your watchlist.`
    );
    return;
  }

  // Create the movie using StreamList's structure
  const newMovie = {
    id: crypto.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: movieTitle,
    completed: false,
    tmdbId: movie.id
  };

  // Update shared React state
  setWatchlist((previousMovies) => [
    ...previousMovies,
    newMovie
  ]);

  // Show confirmation
  setWatchlistMessage(
    `${movieTitle} added to your watchlist!`
  );
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
  alt={`${movie.title || "Movie"} poster`}
  loading="lazy"
  width="150"
  style={{
    width: "150px",
    height: "auto",
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