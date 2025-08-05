import { User, UserResponseSchema } from "../UserSchema";
import { validateResponse } from "../validateResponse";

// API-функции
export const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/user/${id}`);
  await validateResponse(response);
  const data = await response.json();
  return UserResponseSchema.parse(data);
};

// Проверка парсинга
export const fetchMe = async (): Promise<User> => {
  const response = await fetch("/api/users/me");
  await validateResponse(response);
  const data = await response.json();
  return UserResponseSchema.parse(data);
};
