"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "@/api/favorites/favorites";
import { useAuth } from "./useAuth";

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const useIsFavorite = (movieId: number) => {
    return { data: isFavorite(movieId) };
  };

  const addToFavoritesAction = (movieId: number) => {
    addMutation.mutate(movieId);
  };

  const removeFromFavoritesAction = (movieId: number) => {
    removeMutation.mutate(movieId);
  };

  const toggleFavorite = (movieId: number) => {
    if (isFavorite(movieId)) {
      removeFromFavoritesAction(movieId);
    } else {
      addToFavoritesAction(movieId);
    }
  };

  return {
    favorites,
    isLoading,
    error,
    addToFavorites: addToFavoritesAction,
    removeFromFavorites: removeFromFavoritesAction,
    isFavorite,
    useIsFavorite,
    toggleFavorite,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
};
