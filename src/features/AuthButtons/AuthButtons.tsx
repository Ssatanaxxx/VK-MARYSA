"use client";
import { useEffect, useState } from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import style from "./AuthButtons.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import IconUser from "@/../public/user.svg";
import Image from "next/image";
export const AuthButtons = () => {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    setUpdateKey((prev: number) => prev + 1);
  }, [pathName]);

  if (user) {
    return (
      <>
        <Link
          href="/account"
          className={`${style.navLink} ${
            pathName === "/account" ? "active" : ""
          }`}
          key={updateKey}
        >
          {user.name}
        </Link>
        <Image src={IconUser} width={24} className={style.iconUser} height={24} alt={"Иконка жанров"}></Image>
      </>
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
