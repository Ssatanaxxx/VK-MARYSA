import {
  loginResponseSchema,
  userSchema,
  type LoginResponse,
  type User,
  type RegisterFormData,
} from "./schemas/AuthSchema";
import { validateResponse } from "./validateResponse";

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch("https://cinemaguide.skillbox.cc/auth/login", {
      method: "POSt",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(
        `Login failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const validatedData = loginResponseSchema.parse(data);
    return validatedData;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
}

export async function registerUser(data: RegisterFormData): Promise<void> {
  const response = await fetch("https://cinemaguide.skillbox.cc/user", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      surname: data.surname,
      password: data.password,
    }),
  });

  await validateResponse(response);
}

export async function fetchUser(): Promise<User> {
  const response = await fetch("https://cinemaguide.skillbox.cc/user", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  await validateResponse(response);
  const data = await response.json();
  return userSchema.parse(data);
}

export async function logoutUser(): Promise<void> {
  const response = await fetch("https://cinemaguide.skillbox.cc/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status}`);
  }
  const data = response.json();
  return data;
}
