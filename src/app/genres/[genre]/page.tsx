"use client"
import MoviesList from "@/components/MoviesList/MoviesList";

export default function GenrePage() {
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