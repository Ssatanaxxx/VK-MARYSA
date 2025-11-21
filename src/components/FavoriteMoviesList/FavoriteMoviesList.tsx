"use client";
import { IMovie } from "@/api/schemas/Movies";
import Image from "next/image";
import Link from "next/link";
import styles from "./FavoriteMoviesList.module.css";
import MovieSkeleton from "../UI-kit/MovieSkeleton/MovieSkeleton";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteMoviesListProps {
  movies: IMovie[];
}

export default function FavoriteMoviesList({
  movies,
}: FavoriteMoviesListProps) {
  const { removeFromFavorites, isRemoving } = useFavorites();
  const handleRemove = (movieId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    removeFromFavorites(movieId);

    if (removeFromFavorites.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>В избранном пока нет фильмов</p>
          <MovieSkeleton />
        </div>
      );
    }
  };

  return (
    <div className={styles.moviesGrid}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.movieCard}>
          <button
            type="button"
            className={`${styles.removeButton} ${
              isRemoving ? styles.removing : ""
            }`}
            onClick={(e) => handleRemove(movie.id, e)}
            title="Удалить из избранного"
          >
            {isRemoving ? (
              <MovieSkeleton />
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            )}
          </button>
          <Link href={`/movie/${movie.id}`} className={styles.movieLink}>
            <div className={styles.posterContainer}>
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                width={300}
                height={450}
                className={styles.poster}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
