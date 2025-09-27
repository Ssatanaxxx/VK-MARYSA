"use client";
import { FC, useEffect, useState, useCallback } from "react";
import { IMovie } from "../../../types/Movie";
import Api from "../../../api/api";
import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCardInfo from "@/components/MovieCardInfo/MovieCardInfo";

interface MoviePageProps {
  params: {
    id: string;
  };
}

const MovieAboutPageContent: FC<MoviePageProps> = ({ params }) => {
  console.log("MoviePage: params =", params);
  const [data, setData] = useState<IMovie>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const getData = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError("");
      const movieData = await Api.getMovie(params.id);
      setData(movieData);
    } catch (err) {
      console.error("Ошибка загрузки фильма:", err);
      setError("Не удалось загрузить информацию о фильме");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params?.id) {
      getData();
    }
  }, [getData, params?.id]);

  if (isLoading) {
    return <div>Загрузка информации о фильме...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Фильм не найден</div>;
  }

  return (
    <>
      <MovieCard movie={data} />
      <MovieCardInfo movie={data} />
    </>
  );
};

export default MovieAboutPageContent;
