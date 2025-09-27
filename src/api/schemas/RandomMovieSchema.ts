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
  // countries: z.array(z.string()),
  // ageRating: z.number().nullable(),
  // originalTitle: z.string(),
  // poster: z.object({
  //   url: z.string().url(),
  //   previewUrl: z.string().url(),
  // }),
  // language: z.string(),
  // releaseDate: z.string(),
  // budget: z.string(),
  // revenue: z.string(),
  // homepage: z.string(),
  // status: z.string(),
  // backdropUrl: z.string(),
  // trailerYoutubeId: z.string(),
  tmdbRating: z.number(),
  // search: z.string(),
  // keywords: z.array(z.string()),
  // countriesOfOrigin: z.array(z.string()),
  // languages: z.array(z.string()),
  // cast: z.array(z.string()),
  // director: z.string(),
  // production: z.string(),
  // awardsSummary: z.string(),
});

export type RandomMovie = z.infer<typeof RandomMovieSchema>;
