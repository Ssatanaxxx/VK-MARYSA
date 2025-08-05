'use client'

import Link from "next/link"
import { Movie } from "@/types/movie"
import Image from "next/image"
import "./MovieCard.css"
export const MovieCard = ({ movie, rank }: { movie: Movie; rank?: number }) => {
    return (
        <Link href={`/movies/${movie.id}`} className="movie-card">
            {rank && <div className="movie-rank">{rank}</div>}
            <Image
                src={movie.posterUrl || '/ккакой-то постер'}
                alt={movie.title}
                className="movie-poster" />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-rating">
                     ★ {movie.tmdbRating?.toFixed(1) || 'Н/Д'}
                </div>
            </div>
        </Link>
    )
}