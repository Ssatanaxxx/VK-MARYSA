import { Logo } from "@/components/Logo/Logo"
import "./Header.css"
import Link from "next/link" //есть второй вариант с использованием useRouter, но мне кажется что этот вариант более предпочтительнее
import { Navigation } from "@/components/Navigation/Navigation"
import { AuthButtons } from "@/components/utilit/Button"
import RandomMovie from "../Hero/RandomMovie"
import TopMoviesList from "@/components/TopMovie/TopMovie"
export const Header = () => {
    return (
        <div className="header__container">
            <header className="header">
                <Link href="/" passHref className="header__btn"> <Logo /></Link>
                <Navigation />
                <AuthButtons />
            </header>
            <main className="main">
                <section className="hero" id="hero">
                    <RandomMovie />
                </section>
                <section className="top-film" id="TopFilm">
                    <TopMoviesList />
                </section>
            </main>
        </div>
    )
}