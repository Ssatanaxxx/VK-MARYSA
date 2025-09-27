import { Logo } from "@/components/UI-kit/Logo/Logo";
import style from "./Header.module.css";
import Link from "next/link"; //есть второй вариант с использованием useRouter, но мне кажется что этот вариант более предпочтительнее
import { Navigation } from "@/components/UI-kit/Navigation/Navigation";
import { AuthButtons } from "@/features/AuthButtons/AuthButtons";

export const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.header__content}>
          <Link href="/" passHref className={style.header__logo}>
            {" "}
            <Logo />
          </Link>
          <Navigation />
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Header;