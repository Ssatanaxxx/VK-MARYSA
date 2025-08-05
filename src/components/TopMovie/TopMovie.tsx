'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTopMovie } from '@/hooks/useTopMovies'
// import { Movie } from '@/types/movie'
import "./TopMovie.css"

const TopMoviesList = () => {
    const { data: movies, isLoading, error } = useTopMovie()

    if (isLoading) return <MovieListSkeleton />

    if (error) return (
        <div className="error">
            <p>{error.message}</p>
            <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
    )

    return (
        <section className="top-movies">
            <h1 className="top-movies__title">Топ-10 фильмов по рейтингу</h1>
            <div className="movies-grid">
                {movies?.map((movie, index) => (
                    <Link
                        key={movie.id}
                        href={`/movies/${movie.id}`}
                        className="movie-card"
                    >
                        <div className="movie-rank">{index + 1}</div>
                        <Image
                            src={movie.posterUrl || '/default-poster.jpg'}
                            alt={`Постер ${movie.title}`}
                            width={200}
                            height={300}
                            className="movie-poster"
                            priority={index < 3}
                        />
                        <div className="movie-info">
                            <h3 className="movie-title">{movie.title}</h3>
                            <div className="movie-rating">
                                ★ {movie.tmdbRating.toFixed(1)}
                                <span className="movie-year"> ({movie.year})</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

const MovieListSkeleton = () => (
    <div className="skeleton-grid">
        {[...Array(10)].map((_, i) => (
            <div key={i} className="movie-skeleton">
                <div className="skeleton-poster"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-rating"></div>
            </div>
        ))}
    </div>
)

export default TopMoviesList