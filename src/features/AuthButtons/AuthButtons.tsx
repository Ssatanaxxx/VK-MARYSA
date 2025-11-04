"use client";
import { useState } from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import style from "./AuthButtons.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export const AuthButtons = () => {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

  if (user) {
    return (
      <Link
        href="/account"
        className={`${style.navLink} ${
          pathName === "/account" ? "active" : ""
        }`}
      >
        {user.name}
      </Link>
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
