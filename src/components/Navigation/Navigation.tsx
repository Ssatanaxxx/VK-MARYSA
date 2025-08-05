'use client'

import "./Navigation.css"
import Image from "next/image"
import IconSearch from "../../../public/search-icon.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
export const Navigation = () => {
    const pathName = usePathname();
    return (
        <nav className="header__list">
            <li className="header__list-item">
                <Link href="/" className={`nav-link ${pathName === '/' ? 'active' : ''}`}>Главная</Link>
            </li>
            <li className="header__list-item">
                <Link href="/genres" className={`nav-link ${pathName === '/' ? 'active' : ''}`}>Жанры</Link>
            </li>
            <li className="header__list-item">
                <div className="item__search-container">
                    <Image src={IconSearch} width={24} height={24} className="header__logo" alt="Logo VK Marysa" />
                    <input type="text" className="item__search" name="search" placeholder="Поиск" />
                </div>
            </li>
        </nav>
    )
}