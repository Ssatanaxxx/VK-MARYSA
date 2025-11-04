"use client";
import { fetchUser, loginUser, logoutUser, registerUser } from "@/api/Auth/auth";
import {
  LoginFormData,
  RegisterFormData,
  User,
} from "@/api/schemas/AuthSchema";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Auth check failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (loginData: LoginFormData) => {
    try {
      await loginUser(loginData.email, loginData.password);
      const userData = await fetchUser();
      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      return { success: true, message: "Logout successful" };
    } catch (error) {
      setUser(null);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Logout failed",
      };
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
