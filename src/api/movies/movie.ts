import { validateResponse } from "../validateResponse";
import { RandomMovie, RandomMovieSchema } from "./schemas";

const BASE_URL = "https://cinemaguide.skillbox.cc/api/v1";

export async function fetchRandomMovie(): Promise<RandomMovie> {
  const response = await fetch(`${BASE_URL}/movies/random`, {
    headers: {"Accept": "application/json"}});
  await validateResponse(response);
  const data = await response.json();
  return RandomMovieSchema.parse(data);
}
