import z from "zod";

export const TopTenMovieSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Название не может быть пустым"),
  posterUrl: z.string().url("Некорректный URL постера"),
  tmdbRating: z.number().min(0).max(10),
  year: z.number().min(1900).max(2025),
  genres: z.array(z.string().min(1)),
  plot: z.string().optional().default('Описание отсутствует'),
  runtime: z.number().positive().optional(),
  director: z.string().optional().default('Режиссер не указан'),
});

export type TopTenMovie = z.infer<typeof TopTenMovieSchema>;

// Тип для ответа API
export interface ApiResponse<T> {
  data: T;
  error?: string;
}
