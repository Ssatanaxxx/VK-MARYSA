"use client";
import { FC, useState } from "react";
import styles from "./MovieCard.module.css";
import { IMovie } from "@/api/IMovies/IMovie";
import Image from "next/image";
import minutesToString from "../../utils/minutesToString";

interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="container">
      <div className={styles.movieCard}>
        <div className={styles.movieCard__poster}>
          <Image
            src={movie.posterUrl}
            alt={`Постер ${movie.title}`}
            width={680}
            height={552}
            className={styles.movieCard__img}
          />
        </div>

        <div className={styles.movieCard__info}>
          <div className={styles.movieCard__heading}>
            <span className={styles.ratingContent}>
              ★ {movie.tmdbRating?.toFixed(1)}
            </span>
            <span className={styles.movieCard__year}>{movie.releaseYear}</span>
            <span className={styles.movieCard__genre}>
              {movie.genres?.join(", ")}
            </span>
            <span className={styles.movieCard__duration}>
              {minutesToString(movie.runtime)}
            </span>
          </div>

          <h1 className={styles.movieCard__title}>{movie.title}</h1>
          <div className={styles.movieCard__btns}>
            <button
              className={`${styles.movieCard__trailerBtn} btn btn--active`}
              onClick={togglePopup}
            >
              Трейлер
            </button>
            <button className={`${styles.movieCard__favoriteBtn} btn`}>
              <svg width="24" height="24" aria-hidden="true">
                <use href="/sprites.svg#icon-favorite"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
