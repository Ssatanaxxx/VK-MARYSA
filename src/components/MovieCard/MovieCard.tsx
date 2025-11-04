"use client";
import { FC, useState } from "react";
import styles from "./MovieCard.module.css";
import { IMovie } from "@/api/schemas/Movies";
import Image from "next/image";
import minutesToString from "../../utils/minutesToString";
import { useFavorites } from "@/hooks/useFavorites";

interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { useIsFavorite, toggleFavorite, isAdding } = useFavorites();

  const { data: isFavorite = false } = useIsFavorite(movie.id);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleFavoriteClick = () => {
    console.log("Favorite button clicked for movie:", movie.id);
    toggleFavorite(movie.id);
  };

  return (
    <section className={styles.movieSection}>
      <div className={styles.container}>
        <div className={styles.movieCard}>
          <div className={styles.movieCard__poster}>
            <Image
              src={movie.posterUrl}
              alt={`Постер ${movie.title}`}
              width={680}
              height={552}
              className={styles.movieCard__img}
              priority
            />
          </div>

          <div className={styles.movieCard__info}>
            <div className={styles.movieCard__heading}>
              <span className={styles.ratingContent}>
                ★ {movie.tmdbRating?.toFixed(1) || "Н/Д"}
              </span>
              <span className={styles.movieCard__year}>
                {movie.releaseYear}
              </span>
              <span className={styles.movieCard__genre}>
                {movie.genres?.join(", ") || "Жанр не указан"}
              </span>
              <span className={styles.movieCard__duration}>
                {minutesToString(movie.runtime)}
              </span>
            </div>

            <h1 className={styles.movieCard__title}>{movie.title}</h1>
            <div className={styles.movieCard__btns}>
              <button
                className={`${styles.movieCard__trailerBtn} ${styles.btn} ${styles.btnActive}`}
                onClick={togglePopup}
                disabled={!movie.trailerYoutubeId}
              >
                {movie.trailerYoutubeId ? "Трейлер" : "Трейлер недоступен"}
              </button>
              <button
                className={`${styles.movieCard__favoriteBtn} ${styles.btn} ${
                  isFavorite ? styles.movieCard__favoriteBtnActive : ""
                } ${isAdding ? styles.movieCard__favoriteBtnLoading : ""}`}
                onClick={handleFavoriteClick}
                disabled={isAdding}
                title={
                  isFavorite ? "Удалить из избранного" : "Добавить в избранное"
                }
              >
                {isAdding ? (
                  <span className={styles.loadingSpinner}>...</span>
                ) : (
                  <svg width="24" height="24" aria-hidden="true">
                    <use href="/sprites.svg#icon-favorite"></use>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieCard;
