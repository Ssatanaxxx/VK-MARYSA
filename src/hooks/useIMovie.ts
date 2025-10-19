import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchMovie, fetchMovieGenres } from "@/api/IMovies/IMovie";
import { Movies, IMovie, Genres } from "@/api/schemas/Movies";

// Хук для получения фильмов с фильтрацией
export const useMovies = (params?: {
  count?: string;
  title?: string;
  genre?: string;
}) => {
  return useQuery<Movies>({
    queryKey: ["movies", params],
    queryFn: () => fetchMovies(params),
    staleTime: 1000 * 60 * 5,
  });
};

// Хук для получения конкретного фильма
export const useMovie = (movieId: number) => {
  return useQuery<IMovie>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovie(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

// Хук для получения списка жанров
export const useMovieGenres = () => {
  return useQuery<Genres>({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60,
  });
};