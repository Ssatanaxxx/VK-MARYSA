import Image from "next/image";
import logo from "../../../../public/sprites/Vector.svg";
import style from "./UIVector.module.css";
export const UIVector = () => {
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
