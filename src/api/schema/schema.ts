import { z } from "zod";

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string()
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  surname: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
  email: z.string().email("Некорректный email адрес"),
  password: z.string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .regex(/[a-zA-Z]/, "Пароль должен содержать буквы")
    .regex(/[0-9]/, "Пароль должен содержать цифры"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Некорректный email адрес"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type User = z.infer<typeof userSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;