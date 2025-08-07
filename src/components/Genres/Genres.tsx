import { useGenresMovie } from "@/api/movies/GenreMovie"
import Link from "next/link"
import Image from 'next/image'


export const Genres = () => {
    const { data: movies, isLoading, error } = useGenresMovie()

    if (isLoading) return <MovieListSkeleton />

    if (error) return (
        <div className="error">
            <p>{error.message}</p>
            <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
    )

    return (
        <div className="container">
            <h1 className="top-movies__title">Топ 10 фильмов</h1>
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
                    </Link>
                ))}
            </div>
        </div>
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

export default Genres
