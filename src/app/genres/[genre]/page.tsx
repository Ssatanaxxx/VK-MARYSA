"use client"
import MoviesList from "@/components/MoviesList/MoviesList";

interface GenrePageProps {
  params: {
    genre: string;
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  return (
    <>
      <h1 className="visually-hidden">Маруся - каталог фильмов по жанру</h1>
      <section>
        <div className="container">
          <MoviesList />
        </div>
      </section>
    </>
  );
} 