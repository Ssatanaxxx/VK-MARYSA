import { fetchGenres } from "@/api/GenreMovie/GenreMovie";
import { useQuery } from "@tanstack/react-query";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 5,
  });
};