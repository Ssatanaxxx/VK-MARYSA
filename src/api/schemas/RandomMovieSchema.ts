import { z } from "zod";

export const RandomMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  genres: z.array(z.string()),
  posterUrl: z.string(),
  releaseYear: z.number(),
  plot: z.string(),
  runtime: z.number(),
  trailerUrl: z.string(),
  tmdbRating: z.number(),
});

export type RandomMovie = z.infer<typeof RandomMovieSchema>;
