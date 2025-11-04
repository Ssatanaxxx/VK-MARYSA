import { validateResponse } from "../validateResponse";
import { BASE_URL, defaultConfig } from "../config";
import { IMovie, MoviesResponseSchema } from "../schemas/Movies";

export async function addToFavorites(movieId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    credentials: "include",
    headers: {
      ...defaultConfig.headers,
    },
    body: JSON.stringify({ movieId }),
  });

  await validateResponse(response);
}

export async function removeFromFavorites(movieId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/favorites/${movieId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      ...defaultConfig.headers,
    },
  });

  await validateResponse(response);
}

export async function getFavorites(): Promise<IMovie[]> {
  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "GET",
    credentials: "include",
    headers: {
      ...defaultConfig.headers,
    },
  });

  await validateResponse(response);
  const data = await response.json();

  const validatedData = MoviesResponseSchema.parse(data);
  return validatedData;
}

export async function checkIsFavorite(movieId: number): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.some((movie) => movie.id === movieId);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
}
