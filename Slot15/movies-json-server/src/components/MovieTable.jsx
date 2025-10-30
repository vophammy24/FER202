import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  // Lấy confirmDelete từ Context (chứa logic xóa phim)
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  
  const { movies, loading, movieToDelete, showDeleteModal, genres = [], filters = {} } = state;

  // Mapping genreId to genre name from context
  const genreMap = Object.fromEntries((genres || []).map(g => [g.id, g.name]));

  // Hàm để lấy màu badge theo danh mục
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info', 
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
      // Mở Modal Sửa và gán dữ liệu vào state
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      // Mở Modal Xác nhận Xóa và gán phim vào movieToDelete
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  // Apply filters
  const search = (filters.search || '').toLowerCase();
  const selectedGenreId = filters.genreId ? parseInt(filters.genreId) : null;
  const minDur = filters.durationMin ? parseInt(filters.durationMin) : null;
  const selectedCountry = filters.country || '';

  const visibleMovies = movies
    .filter((m) => !search || (m.title || '').toLowerCase().includes(search))
    .filter((m) => !selectedGenreId || m.genreId === selectedGenreId)
    .filter((m) => (minDur === null || m.duration > minDur))
    .filter((m) => !selectedCountry || m.country === selectedCountry)
    .slice()
    .sort((a, b) => {
      if (!filters.sort) return 0;
      const an = (a.title || '').toLowerCase();
      const bn = (b.title || '').toLowerCase();
      const cmp = an.localeCompare(bn);
      return filters.sort === 'desc' ? -cmp : cmp;
    });

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
          </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Poster</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Thể loại</th>
              <th>Thời lượng (phút)</th>
  
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {visibleMovies.map((movie, index) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td><Image src={movie.poster || movie.avatar} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>
                      <Badge bg={getCategoryBadgeVariant(genreName)}>{genreName}</Badge>
                  </td>
                  <td>{movie.duration} phút</td>
                 
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim **"{movieToDelete?.title}"** (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable
