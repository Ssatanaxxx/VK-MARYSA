import { validateResponse } from "../validateResponse";
import { Genres, GenresResponseSchema } from "../schemas/GenreMovieSchema";
import { BASE_URL, defaultConfig } from "../config";

export async function fetchGenres(): Promise<Genres> {
  const response = await fetch(`${BASE_URL}/movie/genres`, {
    method: "GET",
    headers: {
      ...defaultConfig.headers,
      Accept: "application/json",
    },
  });

  await validateResponse(response);
  const data = await response.json();

  const validatedData = GenresResponseSchema.safeParse(data);

  if (!validatedData.success) {
    if (Array.isArray(data)) {
      return data;
    }
    throw new Error("Invalid genres response format");
  }

  return Array.isArray(validatedData.data)
    ? validatedData.data
    : validatedData.data.data;
}
