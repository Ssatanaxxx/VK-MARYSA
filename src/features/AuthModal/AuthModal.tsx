"use client";
import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const switchToRegister = () => {
    setIsLogin(false);
    setShowSuccessMessage(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setShowSuccessMessage(false);
  };

  const handleClose = () => {
    setShowSuccessMessage(false);
    onClose();
  };

  if (!isOpen) return null;

  return isLogin ? (
    <LoginForm onSwitchToRegister={switchToRegister} onClose={handleClose} />
  ) : (
    <RegisterForm
        onSwitchToLogin={switchToLogin}
        onClose={handleClose}
        showSuccessMessage={showSuccessMessage} onRegisterSuccess={function (): void {
          throw new Error("Function not implemented.");
        } }    />
  );
};
