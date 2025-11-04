import { z } from "zod";

export const FavoriteResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

export const FavoritesResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      posterUrl: z.string(),
      releaseYear: z.number(),
    })
  ),
  total: z.number().optional(),
  page: z.number().optional(),
});

export type FavoriteResponse = z.infer<typeof FavoriteResponseSchema>;
export type FavoritesResponse = z.infer<typeof FavoritesResponseSchema>;
