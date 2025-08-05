'use client';
import "./Button.css"

import Link from 'next/link';

export const AuthButtons = () => {
    return (
        <div  >
            <Link href="/login" >
                Войти
            </Link>
            <Link href="/register">
                Регистрация
            </Link>
        </div>
    );
};