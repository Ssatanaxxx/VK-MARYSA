import "./Navigation.css"
import Image from "next/image"
import IconSearch from "../../../public/search-icon.svg"
export const Navigation = () => {
    return (
        <ul className="header__list">
            <li className="header__list-item"><span className="item__text">Главная</span></li>
            <li className="header__list-item"><span className="item__text">Жанры</span></li>
            <li className="header__list-item">
                <div className="item__search-container">
                <Image src={IconSearch} width={24} height={24} className="header__logo" alt="Logo VK Marysa" />
                <input type="text" className="item__search" name="search" placeholder="Поиск" />
                </div>
            </li>
        </ul>
    )
}