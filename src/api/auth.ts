import { 
  loginResponseSchema, 
  userSchema, 
  type LoginResponse, 
  type User, 
  type RegisterFormData 
} from "./schema/schema";
import { validateResponse } from "./validateResponse";

export async function loginUser(
  email: string, 
  password: string
): Promise<LoginResponse> {
  const response = await fetch("https://cinemaguide.skillbox.cc/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  await validateResponse(response);
  const data = await response.json();
  return loginResponseSchema.parse(data);
}

export async function registerUser(data: RegisterFormData): Promise<void> {
  const response = await fetch("https://cinemaguide.skillbox.cc/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      surname: data.surname,
      password: data.password
    }),
  });

  await validateResponse(response);
}

export async function fetchUser(token?: string): Promise<User> {
  const authToken = token || localStorage.getItem("authToken");
  
  if (!authToken) {
    throw new Error("Токен авторизации отсутствует");
  }

  const response = await fetch("https://cinemaguide.skillbox.cc/user", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(response);
  const data = await response.json();
  return userSchema.parse(data);
}

export async function refreshToken(refreshToken: string): Promise<LoginResponse> {
  const response = await fetch("https://cinemaguide.skillbox.cc/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  await validateResponse(response);
  const data = await response.json();
  return loginResponseSchema.parse(data);
}

export async function logoutUser(
  accessToken: string, 
  refreshToken?: string
): Promise<void> {
  try {
    const response = await fetch("https://cinemaguide.skillbox.cc/auth/logout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
        refresh_token: refreshToken
      }),
    });

    if (!response.ok) {
      console.warn("Server-side logout failed, proceeding with client cleanup");
    }
  } catch (error) {
    console.warn("Logout API error (continuing with client cleanup):", error);
  }
}