import { fetchRandomMovie } from "@/api/movies/RandomMovie";
import { useQuery } from "@tanstack/react-query";

export const useRandomMovie = () => {
  return useQuery({
    queryKey: ["randomMovie"],
    queryFn: fetchRandomMovie,
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