// src/pages/HomePage.jsx
import { useMemo, useState, useEffect } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import MyCarousel from "../components/Carousel/MyCarousel";
import Filter from "../components/Filter/Filter.jsx";
import MovieGrid from "../components/Movie/MovieCard";
import { Movie } from "../data/movies";
import { normalizeMovies, applyCriteria} from "../components/Filter/filter.js";


export default function HomePage() {
  const movies = useMemo(
    () => Movie.map((m) => ({ ...m, description: m.description?.trim() || m.fulldes || "" })),
    []
  );

  const normalized = useMemo(() => normalizeMovies(movies), [movies]);

  const [criteria, setCriteria] = useState({
    search: "",
    yearRange: "all",
    sort: "year-desc",
  });


  const filtered = useMemo(
    () => applyCriteria(normalized, criteria),
    [normalized, criteria]
  );


  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [criteria]);


    const PAGE_SIZE = 9;
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(Math.max(1, page), totalPages);
    useEffect(() => { if (page !== safePage) setPage(safePage); }, [safePage]); 

    const start = (safePage - 1) * PAGE_SIZE;
    const currentPageItems = filtered.slice(start, start + PAGE_SIZE);

  // Pagination UI
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const items = [];
    const go = (p) => setPage(Math.min(totalPages, Math.max(1, p)));

    items.push(
      <Pagination.First key="first" onClick={() => go(1)} disabled={safePage === 1} />,
      <Pagination.Prev key="prev" onClick={() => go(safePage - 1)} disabled={safePage === 1} />
    );

    const windowSize = 5;
    const half = Math.floor(windowSize / 2);
    let from = Math.max(1, safePage - half);
    let to = Math.min(totalPages, from + windowSize - 1);
    from = Math.max(1, to - windowSize + 1);

    for (let p = from; p <= to; p++) {
      items.push(
        <Pagination.Item key={p} active={p === safePage} onClick={() => setPage(p)}>
          {p}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next key="next" onClick={() => go(safePage + 1)} disabled={safePage === totalPages} />,
      <Pagination.Last key="last" onClick={() => go(totalPages)} disabled={safePage === totalPages} />
    );

    return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
  };

  return (
    <div>
      <NavBar />
      <MyCarousel />

      <Container className="my-4">

          {/* Sidebar filter */}
        <Row>
            <Filter onChangeCriteria={setCriteria} />
        </Row>


          {/* Kết quả */}
          <Row>
            <h2 className="mt-2">Featured Movies Collections</h2>

            {currentPageItems.length ? (
              <MovieGrid data={currentPageItems} />
            ) : (
              <p className="text-muted my-4">No results found.</p>
            )}

            <p className="text-muted small mt-3">
              Showing <strong>{currentPageItems.length}</strong> of{" "}
              <strong>{filtered.length}</strong> result(s)
            </p>

            {renderPagination()}
          </Row>
      </Container>
    </div>
  );
}