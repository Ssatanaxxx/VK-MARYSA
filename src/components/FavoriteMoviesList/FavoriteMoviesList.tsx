"use client";
import { IMovie } from "@/api/schemas/Movies";
import Image from "next/image";
import Link from "next/link";
import styles from "./FavoriteMoviesList.module.css";

interface FavoriteMoviesListProps {
  movies: IMovie[];
}

export default function FavoriteMoviesList({
  movies,
}: FavoriteMoviesListProps) {
  return (
    <div className={styles.moviesGrid}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.movieCard}>
          <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
            <div className={styles.posterContainer}>
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                width={300}
                height={450}
                className={styles.poster}
              />
            </div>
            <div className={styles.movieInfo}>
              <h3 className={styles.title}>{movie.title}</h3>
              <p className={styles.year}>{movie.releaseYear}</p>
              <p className={styles.rating}>
                ★ {movie.tmdbRating?.toFixed(1) || "Н/Д"}
              </p>
              <p className={styles.genres}>
                {movie.genres?.slice(0, 2).join(", ")}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
