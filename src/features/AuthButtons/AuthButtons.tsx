"use client";
import { useState } from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import style from "./AuthButtons.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const AuthButtons = () => {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (user) {
    return (
      <div className={style.userInfo}>
        <span className={style.userName}>
          {user.name} {user.surname}
        </span>
        <button
          className={style.logoutButton}
          onClick={handleLogout}
          title="Выйти"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        className={`${style.navLink} ${pathName === "/" ? "active" : ""}`}
        onClick={() => setIsModalOpen(true)}
      >
        Войти
      </button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
