import { validateResponse } from "../validateResponse";
import { Genres, GenresSchema } from "../schemas/GenreMovieSchema";
import { BASE_URL, defaultConfig } from "../config";

export async function fetchGenres(): Promise<Genres> {
  const response = await fetch(`${BASE_URL}/movie/genres`, {
    method: "GET",
    headers: { 
      ...defaultConfig.headers,
      "Accept": "application/json"
    },
  });
  
  await validateResponse(response);
  const data = await response.json();
  
  return GenresSchema.parse(data);
}