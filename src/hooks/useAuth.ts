
import { useState, useEffect } from "react";
import { loginUser, registerUser, fetchUser, logoutUser } from "@/api/auth";
import { User } from "@/api/schema/schema";
import { RegisterFormData } from "@/api/schema/schema";

// Добавляем полную реализацию хука
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("authToken");
      if (savedToken) {
        try {
          const userData = await fetchUser(savedToken);
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          authLogout.cleanupClientSide();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { access_token, refresh_token } = await loginUser(email, password);
      
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      
      const userData = await fetchUser(access_token);
      setUser(userData);
      setToken(access_token);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed"
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
        error: error instanceof Error ? error.message : "Registration failed"
      };
    }
  };

  const logout = async () => {
    const result = await authLogout.logout();
    setUser(null);
    setToken(null);
    return result;
  };

  return {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
  };
};

const authLogout = {
  async logout(): Promise<{ success: boolean; message: string }> {
    const accessToken = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");
    
    let serverLogoutSuccess = true;
    let serverMessage = "";

    if (accessToken) {
      try {
        await logoutUser(accessToken, refreshToken || undefined);
        serverMessage = "Server logout successful";
      } catch (error) {
        serverLogoutSuccess = false;
        serverMessage = error instanceof Error ? error.message : "Server logout failed";
      }
    }

    const clientCleanupSuccess = this.cleanupClientSide();
    
    return {
      success: serverLogoutSuccess && clientCleanupSuccess,
      message: serverLogoutSuccess ? 
        "Full logout completed" : 
        `Client cleanup completed, but server logout failed: ${serverMessage}`
    };
  },

  cleanupClientSide(): boolean {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      
      sessionStorage.removeItem("authData");
      
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      if (typeof caches !== 'undefined') {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      
      return true;
    } catch (error) {
      console.error("Client cleanup error:", error);
      return false;
    }
  },

  forceLogout(): void {
    this.cleanupClientSide();
    window.location.reload();
  }
};

