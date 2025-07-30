import { Logo } from "@/components/Logo/Logo"
import "./Header.css"
import Link from "next/link" //есть второй вариант с использованием useRouter, но мне кажется что этот вариант более предпочтительнее
import { Navigation } from "@/components/Navigation/Navigation"
import { AuthForm } from "@/features/auth/AuthForm/AuthForm"

export const Header = () => {
    return (
        <div className="header__container">
            <header className="header">
                <Link href="/main" passHref className="header__btn"> <Logo /></Link>
                <Navigation />
                <AuthForm />
            </header>
        </div>
    )
}