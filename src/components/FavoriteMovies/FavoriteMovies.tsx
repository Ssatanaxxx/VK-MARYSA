"use client";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteMoviesList from "@/components/FavoriteMoviesList/FavoriteMoviesList";
import styles from "./FavoriteMovies.module.css";

export default function FavoriteMovies() {
  const { favorites, isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <div className={styles.sectionContent}>
        <div className={styles.placeholder}>Загрузка избранных фильмов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.sectionContent}>
        <div className={styles.error}>
          Ошибка загрузки избранных фильмов
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.sectionContent}>
        <p className={styles.sectionText}>
          Здесь будут отображаться фильмы, которые вы добавили в избранное.
        </p>
        <div className={styles.placeholder}>Пока здесь пусто...</div>
      </div>
    );
  }

  return (
    <div className={styles.sectionContent}>
      <p className={styles.sectionText}>
        Ваши избранные фильмы ({favorites.length})
      </p>
      <FavoriteMoviesList movies={favorites} />
    </div>
  );
}