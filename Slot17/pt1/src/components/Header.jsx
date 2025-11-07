import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const fullName = user?.fullName || user?.username  || 'User';

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand>TuitionTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <span className="text-light me-3">Signed in as <strong>{fullName}</strong></span>
                <Button variant="outline-light" size="sm" onClick={logout} disabled={loading}>Đăng xuất</Button>
              </>
            ) : (
              <span className="text-light">Chưa đăng nhập</span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
