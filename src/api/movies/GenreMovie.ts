import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://cinemaguide.skillbox.cc/movie/genres";

export async function fetchGenresMovie(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}`);
  
  if (!response.ok) {
    throw new Error("Ошибка загрузки жанров фильмов");
  }
  
  const data = await response.json();
  return data.sort((a: Movie, b: Movie) => 
    a.genres[0]?.localeCompare(b.genres[0] ?? 0)
  );
}

export const useGenres = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['movie-genres'],
    queryFn: fetchGenresMovie,
    staleTime: 60 * 60 * 1000,
    select: (data) => {
      return data.sort((a, b) => a.title.localeCompare(b.title))
    }
  })
}
