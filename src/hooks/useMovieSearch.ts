import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/api/IMovies/IMovie";

export const useMovieSearch = (searchQuery: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["movieSearch", searchQuery],
    queryFn: () => fetchMovies({
      count: "5",
      title: searchQuery,
    }),
    enabled: enabled && searchQuery.length > 2,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};