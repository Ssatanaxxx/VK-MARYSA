import { validateResponse } from "../validateResponse";
import { BASE_URL, defaultConfig } from "../config";
import {
  IMovie,
  MovieSchema,
  MoviesResponseSchema,
  GenresResponseSchema,
} from "../schemas/Movies";

interface MoviesParams {
  limit?: number;
  offset?: number;
  title?: string;
  genres?: string;
  year?: number;
}

export async function fetchMovies(params?: MoviesParams): Promise<IMovie[]> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.offset) queryParams.append("offset", params.offset.toString());
    if (params?.title) queryParams.append("title", params.title);
    if (params?.genres) queryParams.append("genres", params.genres);
    if (params?.year) queryParams.append("year", params.year.toString());

    const url = `${BASE_URL}/movie${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    console.log("Fetching movies from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...defaultConfig.headers,
        Accept: "application/json",
      },
    });

    // ПРОВЕРКА ОТВЕТА
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API response:", data);

    // ВАЖНО: убедись что data - это массив
    if (!Array.isArray(data)) {
      console.error("Expected array but got:", typeof data, data);
      throw new Error("API response is not an array");
    }

    // ВАЛИДАЦИЯ
    const validatedData = MoviesResponseSchema.parse(data);
    console.log("Validated data:", validatedData);

    // ВОЗВРАЩАЕМ МАССИВ
    return validatedData;

  } catch (error) {
    console.error("Error in fetchMovies:", error);
    
    // ВАЖНО: никогда не возвращаем undefined!
    // Возвращаем пустой массив при ошибке
    return [];
  }
}

export async function fetchMovieGenres(): Promise<string[]> {
  const url = `${BASE_URL}/movie/genres`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...defaultConfig.headers,
      Accept: "application/json",
    },
  });

  await validateResponse(response);
  const data = await response.json();

  // console.log("Movie genres API response:", data);

  const validatedData = GenresResponseSchema.parse(data);
  return validatedData.data;
}

export async function fetchMovie(movieId: number): Promise<IMovie> {
  const url = `${BASE_URL}/movie/${movieId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...defaultConfig.headers,
      Accept: "application/json",
    },
  });

  await validateResponse(response);
  const data = await response.json();

  if (data.data) {
    return MovieSchema.parse(data.data);
  }

  return MovieSchema.parse(data);
}
