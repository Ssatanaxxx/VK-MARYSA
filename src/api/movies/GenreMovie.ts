import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://cinemaguide.skillbox.cc/movie/genres";

export async function fetchGenresMovie(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}`, {
    next: { revalidate: 60 * 60 },
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки жанра фильмов");
  }
  const data = response.json();
  return data.sort((a: Movie, b: Movie) => b.genres !== a.genres);
}

export const useGenres = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['movie-genres'],
    queryFn: fetchGenresMovie,
    staleTime: 60 * 60 * 1000,
    onError: (error) => {
      console.error('Ошибка при загрузке жанров:', error)
      // Можно добавить отправку ошибки в Sentry/LogRocket
    },
    select: (data) => {
      // Дополнительная обработка данных при необходимости
      return data.sort((a, b) => a.name.localeCompare(b.name))
    }
  })
};
