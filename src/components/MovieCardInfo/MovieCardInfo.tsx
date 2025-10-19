"use client"
import { FC } from "react";
import styles from "./MovieCardInfo.module.css";
import { IMovie } from "@/api/IMovies/IMovie";

const MovieCardInfo: FC<{ movie: IMovie }> = ({ movie }) => {
  console.log(movie);
  return (
    <>
      <div className={styles.movieCardInfo}>
        <div className="container">
          <div className={styles.movieCardInfo__content}>
            <h2 className={styles.movieCardInfo__title}>О фильме</h2>
            <ul className={`${styles.movieCardInfo__list} list-reset`}>
              <li className={styles.movieCardInfo__item}>
                <div className={styles.movieCardInfo__info}>
                  <span>Язык оригинала</span>
                  <span>{movie.language}</span>
                </div>
              </li>
              <li>
                <div className={styles.movieCardInfo__info}>
                  <span>Бюджет</span>
                  <span>{movie.budget}</span>
                </div>
              </li>
              <li>
                <div className={styles.movieCardInfo__info}>
                  <span>Выручка</span>
                  <span>{movie.revenue}</span>
                </div>
              </li>
              <li>
                <div className={styles.movieCardInfo__info}>
                  <span>Режиссёр</span>
                  <span>{movie.director}</span>
                </div>
              </li>
              <li>
                <div className={styles.movieCardInfo__info}>
                  <span>Продакшен</span>
                  <span>{movie.production}</span>
                </div>
              </li>
              <li>
                <div className={styles.movieCardInfo__info}>
                  <span>Награды</span>
                  <span>{movie.awardsSummary}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCardInfo;
