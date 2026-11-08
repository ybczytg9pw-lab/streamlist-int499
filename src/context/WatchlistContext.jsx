import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const WatchlistContext = createContext(null);

function loadSavedMovies() {
  try {
    const savedMovies = localStorage.getItem("streamlist-movies");

    if (!savedMovies) return [];

    const parsedMovies = JSON.parse(savedMovies);

    if (!Array.isArray(parsedMovies)) return [];

    return parsedMovies.filter(
      (movie) =>
        movie &&
        typeof movie.id === "string" &&
        movie.id.length > 0 &&
        typeof movie.title === "string" &&
        movie.title.trim().length > 0
    );
  } catch (error) {
    console.error("Error loading saved movies:", error);
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [movies, setMovies] = useState(loadSavedMovies);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        "streamlist-movies",
        JSON.stringify(movies)
      );
      setStorageError("");
    } catch (error) {
      console.error("Error saving watchlist:", error);
      setStorageError(
        "Your watchlist could not be saved. Changes may be lost when you close the browser."
      );
    }
  }, [movies]);

  return (
    <WatchlistContext.Provider
      value={{ movies, setMovies, storageError }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlist must be used inside WatchlistProvider"
    );
  }

  return context;
}