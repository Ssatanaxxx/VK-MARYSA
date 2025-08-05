import { fetchRandomMovie } from "@/api/movies/movie";
import { useQuery } from "@tanstack/react-query";

export const useRandomMovie = () => {
  return useQuery({
    queryKey: ["randomMovie"],
    queryFn: fetchRandomMovie,
    staleTime: 1000 * 60 * 5,
  });
};
