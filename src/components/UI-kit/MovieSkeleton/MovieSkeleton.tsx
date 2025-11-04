"use client";
import styles from "./MovieSkeleton.module.css";

export const MovieSkeleton = () => {
  return (
    <div className={styles.movieSkeleton}>
      <span className={styles.skeletonPoster}></span>
      <span className={styles.skeletonTitle}></span>
      <span className={styles.skeletonRating}></span>
    </div>
  );
};

export const MoviesGridSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
};


export default MovieSkeleton