import z from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number(),
  releaseDate: z.string(),
  genres: z.array(z.string()).default([]),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string().nullable().optional(),
  revenue: z.string().nullable().optional(),
  homepage: z.string().optional(),
  status: z.string().optional(),
  posterUrl: z.string(),
  backdropUrl: z.string().nullable().optional(),
  trailerUrl: z.string().optional(),
  trailerYoutubeId: z.string().optional(),
  tmdbRating: z.number().nullable().optional(),
  searchL: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  countriesOfOrigin: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  cast: z.array(z.string()).default([]),
  director: z.string().nullable().optional(),
  production: z.string().nullable().optional(),
  awardsSummary: z.string().nullable().optional(),
});

export type IMovie = z.infer<typeof MovieSchema>;

// ИСПРАВЛЕННАЯ СХЕМА - просто массив фильмов
export const MoviesResponseSchema = z.array(MovieSchema);
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>;

export const MoviesArraySchema = z.array(MovieSchema);
export type Movies = z.infer<typeof MoviesArraySchema>;

export const GenresResponseSchema = z.object({
  data: z.array(z.string()),
  total: z.number().optional(),
  page: z.number().optional(),
});

export type GenresResponse = z.infer<typeof GenresResponseSchema>;

export const GenresSchema = z.array(z.string());
export type Genres = z.infer<typeof GenresSchema>;