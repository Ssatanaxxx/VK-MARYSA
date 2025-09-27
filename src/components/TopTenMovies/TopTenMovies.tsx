"use client";
import { useEffect, useState } from "react";
import styles from "./TopTenMovies.module.css";
import { IMovie } from "../../types/Movie";
import Api from "../../api/api";
import Image from "next/image";
import Link from "next/link";
import { DefaultPoster } from "../UI-kit/DefaultPoster/DefaultPoster";
import { useTopMovie } from "@/hooks/useTopMovies";
import { MovieSkeleton } from "../UI-kit/MovieSkeleton/MovieSkeleton";

export const TopTenMovies = () => {
  const { data: movies, isLoading, error } = useTopMovie();
  const [data, setData] = useState<IMovie[]>([]);

  const getData = async (): Promise<void> => {
    const data = await Api.getTopTenMovies();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

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

  if (!movies) {
    return <div className="error">Фильм не найден</div>;
  }

  return (
    <>
      <div className={styles.topMovies}>
        <div className="container">
          <div className={styles.topMovies__content}>
            <h2 className={styles.topMovies__title}>Топ 10 фильмов</h2>
            <ol className={`${styles.topMovies__list} list-reset`}>
              {data ? (
                data.map((movies) => (
                  <li className={styles.topMovies__item} key={movies.id}>
                    <Link
                      className={styles.topMovies__link}
                      href={`/movie/${movies.id}`}
                    >
                      {movies.posterUrl ? (
                        <Image
                          src={movies.posterUrl}
                          alt={movies.title}
                          width={224}
                          height={336}
                          className={`${styles.topMovies__img} img`}
                        />
                      ) : (
                        <DefaultPoster />
                      )}
                    </Link>
                  </li>
                ))
              ) : (
                <div>Загрузка...</div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopTenMovies;
