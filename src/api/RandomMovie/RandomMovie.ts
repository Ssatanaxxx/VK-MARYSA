import { validateResponse } from "../validateResponse";
import { RandomMovie, RandomMovieSchema } from "../schemas/RandomMovieSchema";
import { BASE_URL, defaultConfig } from "../config";

export async function fetchRandomMovie(): Promise<RandomMovie> {
  const response = await fetch(`${BASE_URL}/movie/random`, {
    method: "GET",
    headers: { ...defaultConfig.headers,
         "Accept": "application/json"
         },
  });
  await validateResponse(response);
  const data = await response.json();
  
  if (data.data) {
    return RandomMovieSchema.parse(data.data);
  }
  
  return RandomMovieSchema.parse(data);
}