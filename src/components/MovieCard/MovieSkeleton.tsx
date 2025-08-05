'use client'

export const MovieSkeleton = () => {
    return (
        <div className="movie-skeleton">
            <span className="skeleton-poster"></span>
            <span className="skeleton-title"></span>
            <span className="skeleton-rating"></span>
        </div>
    )
}

export const MoviesGridSkeleton = ({ count = 10 }: { count?: number }) => {
    return (
        <div className="skeleton-grid">
            {Array.from({ length: count }).map((_, index) => (
                <MovieSkeleton key={index} />
            ))}
        </div>
    )
}