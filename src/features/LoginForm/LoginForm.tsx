"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/api/schemas/AuthSchema";
import { useAuth } from "@/hooks/useAuth";
import "./AuthModal.css";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onClose: () => void;
  showSuccessMessage?: boolean;
}

export const LoginForm = ({
  onSwitchToRegister,
  onClose,
  showSuccessMessage = false,
}: LoginFormProps) => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await login(data);
      if (result.success) {
        reset();
        onClose();
      } else {
        console.error("Login failed:", result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="auth-modal-title">Вход</h2>

        {showSuccessMessage && (
          <div className="success-notification">
            Регистрация успешна! Теперь вы можете войти в аккаунт.
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Электронная почта"
              {...register("email")}
              className={errors.email ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Пароль"
              {...register("password")}
              className={errors.password ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Вход..." : "Войти"}
          </button>

          <div className="auth-switch">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="auth-switch-btn"
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
