"use client";
import { FC, useState } from "react";
import styles from "./MovieCard.module.css";
import { IMovie } from "@/api/schemas/Movies";
import Image from "next/image";
import minutesToString from "../../utils/minutesToString";
import UIFavoriteButton from "../UI-kit/UIFavoriteButton/UIFavoriteButton";
import MovieTrailerPopup from "../MovieTrailerPopup/MovieTrailerPopup";

interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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
              loading="lazy"
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
            <p className={styles.movieCard__description}>
              {movie.plot ||
                "Увлекательные приключения самого известного сыщика всех времен"}
            </p>
            <div className={styles.divider} />
            <div className={styles.movieCard__btns}>
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
              <UIFavoriteButton movie={movie as IMovie} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieCard;
