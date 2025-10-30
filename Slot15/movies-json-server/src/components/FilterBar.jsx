import { Row, Col, Form, Button } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
  const state = useMovieState();
  const { dispatch } = useMovieDispatch();
  const { genres = [], filters = {}, movies = [] } = state;
  const countryOptions = Array.from(new Set((movies || []).map(m => m.country).filter(Boolean)));

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FILTERS', payload: { [name]: value } });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  return (
    <div className="p-3 border rounded bg-light">
      <Row className="g-3">
        <Col md={3}>
          <Form.Group controlId="filterSearch">
            <Form.Label>Tìm kiếm theo tên</Form.Label>
            <Form.Control
              type="text"
              name="search"
              value={filters.search || ''}
              onChange={handleChange}
              placeholder="Nhập tên phim..."
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="filterGenre">
            <Form.Label>Thể loại</Form.Label>
            <Form.Select
              name="genreId"
              value={filters.genreId || ''}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              {(genres || []).map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="filterDurationMin">
            <Form.Label>Thời lượng trên</Form.Label>
            <Form.Control
              type="number"
              name="durationMin"
              value={filters.durationMin || ''}
              onChange={handleChange}
              placeholder="phút"
              min="0"
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="filterCountry">
            <Form.Label>Quốc gia</Form.Label>
            <Form.Select
              name="country"
              value={filters.country || ''}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              {countryOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="filterSort">
            <Form.Label>Sắp xếp theo tên</Form.Label>
            <Form.Select
              name="sort"
              value={filters.sort || ''}
              onChange={handleChange}
            >
              <option value="">Không sắp xếp</option>
              <option value="asc">Tăng dần (A-Z)</option>
              <option value="desc">Giảm dần (Z-A)</option>
            </Form.Select>
          </Form.Group>
        </Col>

      </Row>

      <Row className="g-3 mt-1 justify-content-end">
        <Col md={3} className="d-flex justify-content-end align-items-end">
          <Button variant="secondary" onClick={handleReset}>Xóa bộ lọc</Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;


