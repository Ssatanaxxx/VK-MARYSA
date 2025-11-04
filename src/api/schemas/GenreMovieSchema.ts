import { z } from "zod";

export const GenresSchema = z.array(z.string());
export type Genres = z.infer<typeof GenresSchema>;

export const GenresResponseSchema = z
  .object({
    data: z.array(z.string()),
    total: z.number().optional(),
    page: z.number().optional(),
  })
  .or(z.array(z.string()));

export type GenresResponse = z.infer<typeof GenresResponseSchema>;
