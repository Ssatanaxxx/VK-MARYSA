import z from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string(),
  revenue: z.string(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string(),
  backdropUrl: z.string(),
  trailerUrl: z.string(),
  trailerYoutubeId: z.string(),
  tmdbRating: z.number(),
  search: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string(),
  production: z.string(),
  awardsSummary: z.string(),
});

export type IMovie = z.infer<typeof MovieSchema>;

export const MoviesResponseSchema = z.object({
  data: z.array(MovieSchema),
  total: z.number().optional(),
  page: z.number().optional(),
  hasNext: z.boolean().optional(),
});

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