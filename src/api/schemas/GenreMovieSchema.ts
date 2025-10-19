import { z } from "zod";

export const GenreMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  genres: z.array(z.string()),
  posterUrl: z.string(),
  releaseYear: z.number(),
  plot: z.string(),
  runtime: z.number(),
  trailerUrl: z.string(),
});

export const GenresResponseSchema = z.object({
  data: z.array(z.string()),
  total: z.number().optional(),
  page: z.number().optional(),
});



export type GenreMovie = z.infer<typeof GenreMovieSchema>;
export const GenresSchema = z.array(z.string());
export type Genres = z.infer<typeof GenresSchema>;


// ЕЕ как я понял можно удалить и использовать одну схему IMOVIE