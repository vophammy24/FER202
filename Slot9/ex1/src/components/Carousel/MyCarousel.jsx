import {Carousel} from 'react-bootstrap';
import {carouselMovies} from '../../data/carousel';
import './carousel.css';

function MyCarousel() {
    if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;
    return (
        <Carousel>
            {carouselMovies.map((m) => (
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={m.img}
                    alt={m.alt}
                />
                <Carousel.Caption className="caption">
                    <h3>{m.caption}</h3>
                    <p>{m.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default MyCarousel;