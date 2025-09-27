import { TopTenMovie } from "@/api/schemas/TopTenMoviesSchema";
import { useQuery } from "@tanstack/react-query";

const fetchTopMovies = async (): Promise<TopTenMovie[]> => {
  const response = await fetch(
    "https://cinemaguide.skillbox.cc/movie/top10",
  );
  if (!response.ok) {
    throw new Error("Ошибка загрузки топ фильмов");
  }
  const data = await response.json();
  return data.sort((a: TopTenMovie, b: TopTenMovie) => b.tmdbRating - a.tmdbRating);
};

export const useTopMovie = () => {
  return useQuery<TopTenMovie[]>({
    queryKey: ["top-movies"],
    queryFn: fetchTopMovies,
    staleTime: 60 * 60 * 1000,
  });
};
