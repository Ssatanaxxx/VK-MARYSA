import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const UserSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string().min(6),
  passwordAcsecess: z.string().min(6),
});

export type User = z.infer<typeof UserSchema>;

export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/user/${id}`);
  const data = await response.json();
  return UserSchema.parse(data);
}

// Register

export async function register(
  name: string,
  email: string,
  password: string
): Promise<void> {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, email }),
  });
  await validateResponse(response);
  return undefined;
}

export async function login(email: string, password: string): Promise<void> {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  await validateResponse(response);
  return undefined;
}

export async function fethMe(): Promise<User> {
  const response = await fetch("/api/users/me");
  const response_1 = await validateResponse(response);
  const data = await response_1.json();
  return UserSchema.parse(data);
}
