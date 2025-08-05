import { z } from "zod";

// Схемы
export const RegisterUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    lastName: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  lastName: z.string(),
});

// Типы
export type User = z.infer<typeof UserResponseSchema>;
export type RegisterUserData = z.infer<typeof RegisterUserSchema>;
export type LoginUserData = z.infer<typeof LoginSchema>;


