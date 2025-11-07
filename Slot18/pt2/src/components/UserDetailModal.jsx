import React from 'react';
import { Modal, Button, Row, Col, Image, Badge } from 'react-bootstrap';

const UserDetailModal = ({ show, user, onHide }) => {
  if (!user) return null;

  const avatarSrc = user.avatar || '/images/default.png';
  const statusVariant = user.status === 'active' ? 'success' : 'danger';
  const roleVariant = user.role === 'admin' ? 'primary' : 'secondary';

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="align-items-center g-3">
          <Col xs={3} className="text-center">
            <Image src={avatarSrc} roundedCircle width={64} height={64} alt={user.username} />
          </Col>
          <Col xs={9}>
            <div><strong>ID:</strong> {user.id}</div>
            <div><strong>Username:</strong> {user.username}</div>
            <div><strong>Full Name:</strong> {user.fullName}</div>
            {user.email && (<div><strong>Email:</strong> {user.email}</div>)}
            <div className="mt-2">
              <Badge bg={roleVariant} className="me-2">{user.role}</Badge>
              <Badge bg={statusVariant}>{user.status === 'active' ? 'Active' : 'Locked'}</Badge>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailModal;


