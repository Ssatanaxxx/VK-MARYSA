"use client";
import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCardInfo from "@/components/MovieCardInfo/MovieCardInfo";
import { useMovie } from "@/hooks/useIMovie";
import { useParams } from "next/navigation";

const MovieAboutPageContent = () => {
  const params = useParams();
  const movieId = params.id as string;

  const { isLoading, data: movie, error } = useMovie(Number(movieId));

  if (isLoading) {
    return <div>Загрузка информации о фильме...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!movie) {
    return <div>Фильм не найден</div>;
  }

  return (
    <>
      <MovieCard movie={movie} />
      <MovieCardInfo movie={movie} /> 
    </>
  );
};

export default MovieAboutPageContent;
