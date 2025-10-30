import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand>🎬 Movies Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <span className="text-light me-3">Xin chào, <strong>{user?.username}</strong></span>
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
