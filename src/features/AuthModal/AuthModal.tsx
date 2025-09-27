"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  loginSchema,
  type RegisterFormData,
  type LoginFormData,
} from "@/api/schema/schema";
import { useAuth } from "@/hooks/useAuth";
import "./AuthModal.css";
// import { BlackLogo } from "@/assets/balck-log.svg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();

  const {
    register: registerForm,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegisterForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password");

  const handleLogin = async (data: LoginFormData) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      onClose();
      resetLogin();
    } else {
      alert(result.error);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    const result = await register(data);
    if (result.success) {
      alert("Регистрация успешна! Теперь вы можете войти.");
      setIsLogin(true);
      resetRegister();
    } else {
      alert(result.error);
    }
  };

  const switchToRegister = () => {
    setIsLogin(false);
    resetLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="auth-modal-title">
          {isLogin}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit(handleLogin)} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Электронная почта"
                {...registerForm("email")}
                className={loginErrors.email ? "error" : ""}
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
              />
              {loginErrors.password && (
                <span className="error-text">
                  {loginErrors.password.message}
                </span>
              )}
            </div>

            <button type="submit" className="auth-submit-btn">
              Войти
            </button>

            <div className="auth-switch">
              <button
                type="button"
                onClick={switchToRegister}
                className="auth-switch-btn"
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

            <button type="submit" className="auth-submit-btn">
              Создать аккаунт
            </button>

            <div className="auth-switch">
              <span>У меня есть пароль</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
