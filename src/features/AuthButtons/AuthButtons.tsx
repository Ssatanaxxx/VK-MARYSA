"use client";
import { useState } from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import style from './AuthButtons.module.css';
import { usePathname } from "next/navigation";

export const AuthButtons = () => {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={`${style.navLink} ${pathName === "/" ? "active" : ""}`} onClick={() => setIsModalOpen(true)}>
        Войти
      </button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
