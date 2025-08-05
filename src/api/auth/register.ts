import { RegisterUserData, User, UserResponseSchema } from "../UserSchema";
import { validateResponse } from "../validateResponse";

export const register = async (userData: RegisterUserData): Promise<User> => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  await validateResponse(response);
  const data = await response.json();
  return UserResponseSchema.parse(data);
};
