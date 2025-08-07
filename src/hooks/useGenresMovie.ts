import { fetchGenresMovie } from "@/api/movies/GenreMovie";
import { useQuery } from "@tanstack/react-query";

export const useGenresMovie = () => {
  return useQuery({
    queryKey: ['movie-genres'],
    queryFn: fetchGenresMovie,
    staleTime: 1000 * 60 * 5,
  });
};


// const { data: movie, isLoading } = useQuery({
//   queryKey: ['random-movie'],
//   queryFn: async () => {
//     const res = await fetch(API_URL, {
//       headers: { 'Accept': 'application/json' }
//     });
//     if (!res.ok) throw new Error('Failed to fetch');
//     return res.json();
//   }
// });