import { useQuery } from "@tanstack/react-query";
import {
  fetchMovies,
  fetchMovie,
  fetchMovieGenres,
} from "@/api/IMovies/IMovie";
import { Movies, IMovie, Genres } from "@/api/schemas/Movies";

interface MoviesParams {
  limit?: number;
  offset?: number;
  title?: string;
  genres?: string;
  year?: number;
}

export const useMovies = (
  params?: MoviesParams,
  options?: { enabled?: boolean; staleTime?: number }
) => {
  return useQuery<Movies>({
    queryKey: ["movies", params],
    queryFn: () => fetchMovies(params),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useMovie = (movieId: number) => {
  return useQuery<IMovie>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovie(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useMovieGenres = () => {
  return useQuery<Genres>({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60,
  });
};
