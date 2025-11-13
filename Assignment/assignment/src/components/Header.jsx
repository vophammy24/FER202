import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.fullName || user?.username || 'User';
  const logo = './images/logo.png';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" variant="light" expand="md">
      <Container>
        <Navbar.Brand>
          <Image src={logo} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          PersonalBudget
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <span className="text-dark me-3">Signed in as <strong>{fullName}</strong></span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} disabled={loading}>
                  Logout
                </Button>
              </>
            ) : (
              <span className="text-dark">Chưa đăng nhập</span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;