import MyCarousel from "../components/Carousel/MyCarousel";
import MovieGrid from "../components/Movie/MovieCard";
import { Movie } from "../data/movies";

export default function HomePage() {
    const normalized = Movie.map((m) => ({
        ...m,
        description: m.description?.trim() || m.fulldes || "",
        }));

    return (
    <div>
        <MyCarousel />
        <div className= "container" >
            <h2 className="mb-4">Featured Movies Collections</h2>
            <MovieGrid data={normalized} />
        </div>
        
    </div>
    )
}