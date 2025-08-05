import { z } from "zod";

export const RandomMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  rating: z.number(),
  ageRating: z.number().nullable(),
  genres: z.array(z.string()),
  countries: z.array(z.string()),
  poster: z.object({
    url: z.string().url(),
    previewUrl: z.string().url(),
  }),
});

export type RandomMovie = z.infer<typeof RandomMovieSchema>;
