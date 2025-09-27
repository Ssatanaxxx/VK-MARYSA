"use client"
import { useEffect, useState } from "react";
import Api from "@/api/api";
import styles from "./layout.module.css";
import Link from "next/link";

export default function GenresPage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const genresData = await Api.getMovieGenres();
        setGenres(genresData);
      } catch (err) {
        console.error("Ошибка загрузки жанров:", err);
        setError("Не удалось загрузить данные");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) return <div className={styles.loading}>Загрузка жанров...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!genres.length) return <div className={styles.empty}>Жанры не найдены</div>;

  return (
    <>
      <h1 className="visually-hidden">Маруся - каталог жанров</h1>
      <section>
        <div className="container">
          <h2 className={styles.genres__title}>Жанры фильмов</h2>
          <ul className={`${styles.genres__list} list-reset`}>
            {genres.map((genre) => (
              <li className={styles.genres__item} key={genre}>
                <Link className={styles.genres__link} href={`/genres/${genre}`}>
                  <div className={styles.genres__card}>
                    <span className={styles.genres__name}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}