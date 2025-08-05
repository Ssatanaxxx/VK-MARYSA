import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

const fetchTopMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    "https://cinemaguide.skillbox.cc/api/v1/movies/top?limit=10",
    { next: { revalidate: 60 * 60 } }
  );
  if (!response.ok) {
    throw new Error("Ошибка загрузки топ фильмов");
  }
  const data = await response.json();
  return data.sort((a: Movie, b: Movie) => b.tmdbRating - a.tmdbRating);
};

export const useTopMovie = () => {
  return useQuery<Movie[]>({
    queryKey: ["top-movies"],
    queryFn: fetchTopMovies,
    staleTime: 60 * 60 * 1000,
  });
};
