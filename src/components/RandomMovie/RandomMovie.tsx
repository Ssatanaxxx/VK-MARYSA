"use client";
import styles from "./RandomMovie.module.css";
import Image from "next/image";
import minutesToString from "@/utils/minutesToString";
import MovieTrailerPopup from "../MovieTrailerPopup/MovieTrailerPopup";
import Link from "next/link";
import { useRandomMovie } from "@/hooks/useRandomMovie";
import { useState } from "react";

const RandomMovie = () => {
  const { data: movie, isLoading, error, refetch } = useRandomMovie();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">Ошибка: {error.message}</div>;
  }

  if (!movie) {
    return <div className="error">Фильм не найден</div>;
  }

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.ratingContent}>
            <span className={styles.tmdbRating}>
              <svg width="16" height="16" aria-hidden="true">
                <use href="/sprites.svg#icon-star"></use>
              </svg>
            </span>
            <span className={styles.movieCard__year}>{movie.releaseYear}</span>
          </div>
          <span className={styles.movieCard__genre}>
            {movie.genres?.join(", ")}
          </span>
          <span className={styles.movieCard__duration}>
            {minutesToString(movie.runtime)}
          </span>
        </div>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.movieCard__description}>
          {movie.plot ||
            "Увлекательные приключения самого известного сыщика всех времен"}
        </p>

        <div className={styles.divider} />
        <div className={styles.movieCard__controls}>
          <button
            className={`${styles.movieCard__trailerBtn} btn btn--active`}
            onClick={togglePopup}
          >
            Трейлер
          </button>
          <MovieTrailerPopup
            isOpen={isPopupOpen}
            onClose={togglePopup}
            trailerUrl={movie.trailerUrl}
          />
          <Link
            className={`${styles.movieCard__aboutBtn} btn`}
            href={`/movie/${movie.id}`}
          >
            О фильме
          </Link>
          <button className={`${styles.movieCard__favoriteBtn} btn`}>
            <svg width="24" height="24" aria-hidden="true">
              <use href="/sprites.svg#icon-favorite"></use>
            </svg>
          </button>
          <button
            className={`${styles.movieCard__favoriteBtn} btn`}
            onClick={handleRefetch}
          >
            <svg width="24" height="24" aria-hidden="true">
              <use href="/sprites.svg#icon-refresh"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.poster}>
        {movie.posterUrl ? (
          <Image
            src={
              movie.posterUrl.startsWith("http")
                ? movie.posterUrl
                : `https://cinemaguide.skillbox.cc/movie/random${movie.posterUrl}`
            }
            alt={`Постер ${movie.title}`}
            fill
            className={styles.posterImage}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className={styles.noPoster}>Нет постера</div>
        )}
      </div>
    </div>
  );
};
export default RandomMovie;
