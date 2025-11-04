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

  console.log("Genres API response:", data); // Для отладки

  // Безопасный парсинг с обработкой разных форматов ответа
  const validatedData = GenresResponseSchema.safeParse(data);

  if (!validatedData.success) {
    console.warn("Genres validation warning:", validatedData.error);
    // Если валидация не прошла, пробуем вернуть данные как есть
    if (Array.isArray(data)) {
      return data;
    }
    throw new Error("Invalid genres response format");
  }

  // Если пришел объект с data, возвращаем data, иначе сам массив
  return Array.isArray(validatedData.data)
    ? validatedData.data
    : validatedData.data.data;
}
