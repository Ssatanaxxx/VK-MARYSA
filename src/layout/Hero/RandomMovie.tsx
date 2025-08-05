'use client'
import { useQuery } from "@tanstack/react-query"
import "./RandomMovie.css"
import Image from "next/image"

const RandomMovie = () => {
    const { data: movie, isLoading, error } = useQuery({
        queryKey: ['random-movie'],
        queryFn: async () => {
            const response = await fetch('https://cinemaguide.skillbox.cc/')
            if (!response.ok) throw new Error('Ошибка загрузки фильма')
            return response.json()
        },
        staleTime: 0
    })

    if (isLoading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        )
    }

    if (error) {
        return <div className="error">Ошибка: {error.message}</div>
    }

    if (!movie) {
        return <div className="error">Фильм не найден</div>
    }

    return (
        <div className="card">
            {/* Постер */}
            <div className="poster">
                {movie.posterUrl ? (
                    <Image
                        src={movie.posterUrl.startsWith('http')
                            ? movie.posterUrl
                            : `https://cinemaguide.skillbox.cc${movie.posterUrl}`}
                        alt={`Постер ${movie.title}`}
                        className="poster-image"
                        loading="lazy"
                    />
                ) : (
                    <div className="no-poster">Нет постера</div>
                )}
            </div>

            {/* Описание фильма */}
            <div className="content">
                <h1 className="title">{movie.title}</h1>
                <p className="description">
                    {movie.plot || 'Увлекательные приключения самого известного сыщика всех времен'}
                </p>

                {/* Блок с мета-данными */}
                <div className="meta">
                    <span>{movie.relaseYear}</span>
                    <span>★ {movie.tmdbRating?.toFixed(1) || '6.0'}</span>
                    <span>{movie.genres?.join(', ')}</span>
                </div>
            </div>
        </div>
    )
}
export default RandomMovie;