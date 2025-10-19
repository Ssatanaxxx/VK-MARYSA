import { validateResponse } from "../validateResponse";
import { BASE_URL, defaultConfig } from "../config";
import { 
  IMovie, 
  MovieSchema, 
  MoviesResponseSchema,
  GenresResponseSchema 
} from "../schemas/Movies";

export async function fetchMovies(params?: {
  count?: string;
  title?: string;
  genre?: string;
}): Promise<IMovie[]> {
  const queryParams = new URLSearchParams();
  
  if (params?.count) queryParams.append("count", params.count);
  if (params?.title) queryParams.append("title", params.title);
  if (params?.genre) queryParams.append("genre", params.genre);

  const url = `${BASE_URL}/movie${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...defaultConfig.headers,
      "Accept": "application/json"
    },
  });

  await validateResponse(response);
  const data = await response.json();
  
  const validatedData = MoviesResponseSchema.parse(data);
  
  return validatedData.data;
}

export async function fetchMovieGenres(): Promise<string[]> {
  const url = `${BASE_URL}/movie/genres`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...defaultConfig.headers,
      "Accept": "application/json"
    },
  });

  await validateResponse(response);
  const data = await response.json();
  
  const validatedData = GenresResponseSchema.parse(data);
  
  return validatedData.data;
}

export async function fetchMovie(movieId: number): Promise<IMovie> {
  const url = `${BASE_URL}/movie/${movieId}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...defaultConfig.headers,
      "Accept": "application/json"
    },
  });

  await validateResponse(response);
  const data = await response.json();
  
  if (data.data) {
    return MovieSchema.parse(data.data);
  }
  
  return MovieSchema.parse(data);
}