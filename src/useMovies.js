// custom hook to abstract the logic of fetching movies
// extract non-visual logic into a custom hook
import { useEffect, useState } from "react";
import axios from "axios";

const KEY = import.meta.env.VITE_API_KEY;

// So we can think of this argument here, again, a bit like the public API of this custom hook,
// export function useMovies(query, callback) {
export function useMovies(query) {
  //   a custom hook needs to use AT LEAST one of the React hooks to discern it from a regular function
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // optional chaining on calling the function itself
      // callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await axios.get(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          console.log(res.data);
          if (res.data.Response === "False") throw new Error("Movie not found");
          setMovies(res.data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message, err.code);
            if (err.name !== "CanceledError") {
              console.log("canceled exception block");
              console.log(err, err.message);
              setError(err.message);
            } else {
              console.log("something went wrong block", err.message, err);
              setError("Something went wrong with fetching movies.");
            }
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    // [query, callback]
    [query]
  );
  return { movies, isLoading, error };
}
