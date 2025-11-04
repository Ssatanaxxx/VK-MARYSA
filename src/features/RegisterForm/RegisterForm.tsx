"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/api/schemas/AuthSchema";
import { useAuth } from "@/hooks/useAuth";
import "./AuthModal.css";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
  showSuccessMessage: boolean;
  onRegisterSuccess: () => void;
}

export const RegisterForm = ({
  onSwitchToLogin,
  onClose,
  onRegisterSuccess,
}: RegisterFormProps) => {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password");

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const result = await registerUser(data);
      if (result.success) {
        reset();
        onRegisterSuccess();
      } else {
        console.error("Registration failed:", result.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="auth-modal-title">Регистрация</h2>

        <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Имя"
              {...register("name")}
              className={errors.name ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="error-text">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Фамилия"
              {...register("surname")}
              className={errors.surname ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.surname && (
              <span className="error-text">{errors.surname.message}</span>
            )}
          </div>

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

          <div className="form-group">
            <input
              type="password"
              placeholder="Подтвердите пароль"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "error" : ""}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <span className="error-text">
                {errors.confirmPassword.message}
              </span>
            )}
            {passwordValue &&
              watch("confirmPassword") &&
              passwordValue === watch("confirmPassword") && (
                <span className="success-text">✓ Пароли совпадают</span>
              )}
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Регистрация..." : "Создать аккаунт"}
          </button>

          <div className="auth-switch">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="auth-switch-btn"
              disabled={isSubmitting}
            >
              У меня есть пароль
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
