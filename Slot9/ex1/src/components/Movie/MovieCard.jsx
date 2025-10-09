import { useMemo, useState } from "react";
import { Row, Col, Card, Badge, Button, Modal, Toast, ToastContainer } from "react-bootstrap";
import './movie.css';


const truncate = (text, max = 120) => {
  if (!text) return "";
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max).trim() + "…" : t;
};

/** A single card */
export function MovieCard({ movie, onAdd }) {
  const [open, setOpen] = useState(false);

  const genreText = movie.genre;
  const genres = useMemo(
    () => genreText.split(",").map(s => s.trim()).filter(Boolean),
    [genreText]
  );

  const shortDesc = truncate(movie.description, 90);

  const showtimes = ["10:00", "13:30", "16:45", "20:00"]; 

  return (
    <>
      <Card className="movie-card h-100 shadow-sm border-0" onMouseEnter={() => {}} onMouseLeave={() => {}}>
        <div className="ratio ratio-16x9">
          <Card.Img
            src={movie.poster}
            alt={`Poster ${movie.title}`}
            style={{ objectFit: "cover", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem" }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-2">{movie.title}</Card.Title>

          <div className="text-muted small mb-2">
            <span className="me-2">{movie.year}</span>
            <span className="vr mx-2" />
            <span className="me-2">{movie.country}</span>
            <span className="vr mx-2" />
            <span className="me-2">{movie.duration}</span>
          </div>

          <Card.Text className="flex-grow-1 line-clamp-2">{shortDesc}</Card.Text>

          <div className="mb-3">
            {genres.map((g, i) => (
              <Badge bg="info" key={`${g}-${i}`} className="me-1 mb-1">{g}</Badge>
            ))}
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="danger"
              className="flex-grow-1"
              onClick={() => onAdd?.(movie)}
            >
              Add to Favourites
            </Button>
            <Button variant="outline-primary" onClick={() => setOpen(true)}>
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Details Modal */}
      <Modal show={open} onHide={() => setOpen(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={5}>
              <img
                src={movie.poster}
                alt={`Poster ${movie.title}`}
                className="img-fluid rounded-3"
              />
              <div className="mb-3">
                {genres.map((g, i) => (
                  <Badge bg="info" key={`m-${g}-${i}`} className="center my-2 me-2">{g}</Badge>
                ))}
              </div>
            </Col>
            <Col md={7}>
              <div className="mb-2">
                <strong>Năm:</strong> {movie.year} &nbsp;|&nbsp; <strong>Quốc gia:</strong> {movie.country}
              </div>
              <div className="mb-2">
                <strong>Thời lượng:</strong>  {movie.duration} 
              </div>
              <h6 className="mb-2">Mô tả chi tiết</h6>
              <p className="mb-4">{movie.description}</p>

              <h6 className="mb-2">Showtimes</h6>
              <div className="d-flex flex-wrap gap-2">
                {showtimes.map(t => (
                  <Badge bg="primary" key={t} className="p-2">{t}</Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" className="flex-grow-12" onClick={() => onAdd?.(movie)}> Add to Favourites </Button>
            <Button variant="outline-secondary" onClick={() => setOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/** Grid + Toast manager */
export default function MovieGrid({ data = [] }) {
  const [toast, setToast] = useState({ show: false, text: "" });

  const handleAdd = (movie) => {
    try {
      const key = "favourites";
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      const exists = list.some((m) => m.title === movie.title);
      const next = exists ? list : [...list, movie];
      localStorage.setItem(key, JSON.stringify(next));
      setToast({ show: true, text: "Added to favourites!" });
    } catch {
      setToast({ show: true, text: "Cannot access localStorage." });
    }
  };

  return (
    <>
      <Row className="g-4">
        {data.map((m, idx) => (
          <Col key={idx} xs={12} md={6} lg={4}>
            <MovieCard movie={m} onAdd={handleAdd} />
          </Col>
        ))}
      </Row>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="mb-3"  containerPosition="fixed">
        <Toast
          bg="dark"
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white text-center">
            {toast.text}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
