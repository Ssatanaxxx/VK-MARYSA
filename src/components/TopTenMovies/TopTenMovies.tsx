"use client";
import styles from "./TopTenMovies.module.css";
import Image from "next/image";
import Link from "next/link";
import { DefaultPoster } from "../UI-kit/DefaultPoster/DefaultPoster";
import { useTopMovie } from "@/hooks/useTopMovies";
import { MovieSkeleton } from "../UI-kit/MovieSkeleton/MovieSkeleton";

export const TopTenMovies = () => {
  const { data: movies, isLoading, error } = useTopMovie();

  if (isLoading) return <MovieSkeleton />;

  if (error)
    return (
      <div className="error">
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );

  if (!movies || movies.length === 0) {
    return <div className="error">Фильмы не найдены</div>;
  }

  return (
    <>
      <div className={styles.topMovies}>
        <div className="container">
          <div className={styles.topMovies__content}>
            <h2 className={styles.topMovies__title}>Топ 10 фильмов</h2>
            <ol className={`${styles.topMovies__list} list-reset`}>
              {movies.slice(0, 10).map((movie) => (
                <li className={styles.topMovies__item} key={movie.id}>
                  <Link
                    className={styles.topMovies__link}
                    href={`/movie/${movie.id}`}
                  >
                    {movie.posterUrl ? (
                      <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        width={224}
                        height={336}
                        className={`${styles.topMovies__img} img`}
                      />
                    ) : (
                      <DefaultPoster />
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopTenMovies;
