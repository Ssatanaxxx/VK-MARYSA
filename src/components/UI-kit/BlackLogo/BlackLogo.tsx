import Image from "next/image";
import logo from "../../../../public/blacklogo.svg";
import style from "./BlackLogo.module.css";
export const BlackLogo = () => {
  return (
    <Image
      src={logo}
      width={143}
      height={32}
      className={style.header__logo}
      alt="Logo VK Marysa"
    />
  );
};
