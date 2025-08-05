import { LoginUserData, User, UserResponseSchema } from "../UserSchema";
import { validateResponse } from "../validateResponse";

export const login = async (credentials: LoginUserData): Promise<User> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  await validateResponse(response);
  const data = await response.json();
  return UserResponseSchema.parse(data);
};
