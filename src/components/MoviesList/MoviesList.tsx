"use client";
import { useMovies } from "@/hooks/useIMovie";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./MoviesList.module.css";
import Image from "next/image";

export const MoviesList = () => {
  const params = useParams();
  const genre = params?.genre as string;

  const {
    data: movies,
    isLoading,
    error,
  } = useMovies({
    genre: genre,
  });

  if (!genre) {
    return <div className={styles.error}>Жанр не указан</div>;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  return (
    <div className={styles.movies}>
      <div className="container">
        <div className={styles.movies__content}>
          <div className={styles.movies__titleContainer}>
            <Link className={styles.movies__titleBtn} href="/genres">
              {"<"}
            </Link>
            <h2 className={styles.movies__title}>{genre}</h2>
          </div>

          {isLoading ? (
            <div className={styles.loading}>Загрузка...</div>
          ) : (
            <ul className={`${styles.movies__list} list-reset`}>
              {movies && movies.length > 0 ? (
                movies.map((movie) => (
                  <li key={movie.id} className={styles.movies__item}>
                    <Link
                      href={`/movie/${movie.id}`}
                      className={styles.movies__link}
                    >
                      <Image
                        className={styles.movies__img}
                        src={movie.posterUrl}
                        alt={movie.title}
                        width={224}
                        height={336}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk6obJShPkA3CYg3Ugf/2Q=="
                      />
                    </Link>
                  </li>
                ))
              ) : (
                <div className={styles.empty}>Фильмы не найдены</div>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
