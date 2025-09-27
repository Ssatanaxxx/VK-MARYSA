import RandomMovie from "@/components/RandomMovie/RandomMovie";
import TopMoviesList from "@/components/TopTenMovies/TopTenMovies";
import "./layout.css";

export default function Home() {
  return (
    <>
      <section className="randoMovie">
        <div className="container">
          <RandomMovie />
        </div>
      </section>
      <section className="topMovie">
        <div className="container">
          <TopMoviesList />
        </div>
      </section>
    </>
  );
}