"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  loginSchema,
  type RegisterFormData,
  type LoginFormData,
} from "@/api/schemas/AuthSchema";
import { useAuth } from "@/hooks/useAuth";
import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { login, register, user } = useAuth();

  const {
    register: registerForm,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegisterForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegister,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password");

  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        onClose();
        resetLogin();
      } else {
        alert(result.error || "Ошибка входа");
      }
    } catch (error) {
      alert("Произошла ошибка при входе");
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const result = await register(data);
      if (result.success) {
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
          setIsLogin(true);
          resetRegister();
        }, 2000);
      } else {
        alert(result.error || "Ошибка регистрации");
      }
    } catch (error) {
      alert("Произошла ошибка при регистрации");
      console.error("Register error:", error);
    }
  };

  const switchToRegister = () => {
    setIsLogin(false);
    resetLogin();
    setShowSuccessMessage(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
    resetRegister();
    setShowSuccessMessage(false);
  };

  const handleClose = () => {
    resetLogin();
    resetRegister();
    setShowSuccessMessage(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={handleClose}>
          ×
        </button>

        <h2 className="auth-modal-title">{isLogin ? "Вход" : "Регистрация"}</h2>

        {showSuccessMessage && (
          <div className="success-notification">
            Регистрация успешна! Теперь вы можете войти в аккаунт.
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit(handleLogin)} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Электронная почта"
                {...registerForm("email")}
                className={loginErrors.email ? "error" : ""}
                disabled={isLoginSubmitting}
              />
              {loginErrors.email && (
                <span className="error-text">{loginErrors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Пароль"
                {...registerForm("password")}
                className={loginErrors.password ? "error" : ""}
                disabled={isLoginSubmitting}
              />
              {loginErrors.password && (
                <span className="error-text">
                  {loginErrors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoginSubmitting}
            >
              {isLoginSubmitting ? "Вход..." : "Войти"}
            </button>

            <div className="auth-switch">
              <button
                type="button"
                onClick={switchToRegister}
                className="auth-switch-btn"
                disabled={isLoginSubmitting}
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleRegisterSubmit(handleRegister)}
            className="auth-form"
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Имя"
                {...registerRegisterForm("name")}
                className={registerErrors.name ? "error" : ""}
                disabled={isRegisterSubmitting}
              />
              {registerErrors.name && (
                <span className="error-text">
                  {registerErrors.name.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Фамилия"
                {...registerRegisterForm("surname")}
                className={registerErrors.surname ? "error" : ""}
                disabled={isRegisterSubmitting}
              />
              {registerErrors.surname && (
                <span className="error-text">
                  {registerErrors.surname.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Электронная почта"
                {...registerRegisterForm("email")}
                className={registerErrors.email ? "error" : ""}
                disabled={isRegisterSubmitting}
              />
              {registerErrors.email && (
                <span className="error-text">
                  {registerErrors.email.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Пароль"
                {...registerRegisterForm("password")}
                className={registerErrors.password ? "error" : ""}
                disabled={isRegisterSubmitting}
              />
              {registerErrors.password && (
                <span className="error-text">
                  {registerErrors.password.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Подтвердите пароль"
                {...registerRegisterForm("confirmPassword")}
                className={registerErrors.confirmPassword ? "error" : ""}
                disabled={isRegisterSubmitting}
              />
              {registerErrors.confirmPassword && (
                <span className="error-text">
                  {registerErrors.confirmPassword.message}
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
              disabled={isRegisterSubmitting}
            >
              {isRegisterSubmitting ? "Регистрация..." : "Создать аккаунт"}
            </button>

            <div className="auth-switch">
              <button
                type="button"
                onClick={switchToLogin}
                className="auth-switch-btn"
                disabled={isRegisterSubmitting}
              >
                У меня есть пароль
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
