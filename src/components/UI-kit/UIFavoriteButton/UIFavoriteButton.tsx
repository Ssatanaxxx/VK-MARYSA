import { useFavorites } from "@/hooks/useFavorites";
import UITooltip from "../UITooltip/UITooltip";
import styles from "./UIFavoriteButton.module.css";
import { useAuth } from "@/hooks/useAuth";
import { IMovie } from "@/api/schemas/Movies";
import { FC } from "react";

interface UIFavoriteButtonProps {
  movie: IMovie;
}

export const UIFavoriteButton: FC<UIFavoriteButtonProps> = ({ movie }) => {
  const { useIsFavorite, toggleFavorite, isAdding } = useFavorites();
  const { user } = useAuth();
  const { data: isFavorite = false } = useIsFavorite(movie.id);

  const handleFavoriteClick = () => {
    toggleFavorite(movie.id);
  };

  return (
    <UITooltip isAuthenticated={!!user}>
      <button
        className={`${styles.movieCard__favoriteBtn} ${styles.btn} ${
          isFavorite ? styles.movieCard__favoriteBtnActive : ""
        } ${isAdding ? styles.movieCard__favoriteBtnLoading : ""}`}
        onClick={handleFavoriteClick}
        disabled={isAdding}
        title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      >
        {isAdding ? (
          <span className={styles.loadingSpinner}>...</span>
        ) : (
          <svg width="24" height="24" aria-hidden="true">
            <use href="/sprites.svg#icon-favorite"></use>
          </svg>
        )}
      </button>
    </UITooltip>
  );
};

export default UIFavoriteButton;
