import Genres from "@/components/Genres/Genres"
import { Footer } from "@/layout/Footer/Footer"
import { Header } from "@/layout/Header/Header"
export default function GenresPage() {
    return (
        <>
    <div className="">
      <div className="container">
        <Header />
      </div>
      <div className="container">
        <Genres/>
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
        </>
    )
}

