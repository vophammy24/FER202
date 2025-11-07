import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const fullName = user?.fullName || user?.username  || 'User';

  const isAdmin = user?.role === 'admin' && isAuthenticated;

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">TuitionTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Nav.Link as={NavLink} to="/userlist" className="text-light me-3 border">
                    User Management
                  </Nav.Link>)}
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
