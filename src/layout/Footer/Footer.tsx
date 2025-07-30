import "./Footer.css"
import Image from "next/image"
import IconVK from "../../../public/vk.svg"
import IconTelegramm from "../../../public/telegram.svg"
import IconOk from "../../../public/ok.svg"
import IconYoutube from "../../../public/youtube.svg"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="footer__container">
            <ul className="footer__list">
                <li className="footer__list-item">
                    <Link href="#" passHref className="header__btn">
                        <Image className="footer__item-icon" title="link" src={IconVK} width={36} height={36} alt="Кликабельная ссылка на социальную сеть"></Image>
                    </Link>
                </li>
                <li className="footer__list-item">
                    <Link href="#" passHref className="header__btn">
                        <Image className="footer__item-icon" title="link" src={IconYoutube} width={36} height={36} alt="Кликабельная ссылка на социальную сеть"></Image>
                    </Link>
                </li>
                <li className="footer__list-item">
                    <Link href="#" passHref className="header__btn">
                        <Image className="footer__item-icon" title="link" src={IconOk} width={36} height={36} alt="Кликабельная ссылка на социальную сеть"></Image>
                    </Link>
                </li>
                <li className="footer__list-item">
                    <Link href="#" passHref className="header__btn">
                        <Image className="footer__item-icon" title="link" src={IconTelegramm} width={36} height={36} alt="Кликабельная ссылка на социальную сеть"></Image>
                    </Link>
                </li>
            </ul>

        </div>
    )
}