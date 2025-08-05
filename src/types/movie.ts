export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  tmdbRating: number;
  year: number;
  genres: string[];
  plot?: string;
  runtime?: number;
  director?: string;
}

// Тип для ответа API
export interface ApiResponse<T> {
  data: T;
  error?: string;
}
