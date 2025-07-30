import Image from "next/image"
import logo from "../../../public/logo.svg"
import "./Logo.css"
export const Logo = () => {
    return (
            <Image src={logo} width={143} height={32} className="header__logo" alt="Logo VK Marysa" />
    )
}