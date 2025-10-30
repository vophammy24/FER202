import React, { useReducer } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login, loading } = useAuth();

  const initialState = { username: '', password: '', errors: {}, submitError: '' };
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'SET_ERRORS':
        return { ...state, errors: action.errors };
      case 'CLEAR_ERRORS':
        return { ...state, errors: {}, submitError: '' };
      case 'SUBMIT_ERROR':
        return { ...state, submitError: action.message };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_ERROR', message: '' });
    const errors = {};
    if (!state.username.trim()) errors.username = 'Vui lòng nhập username';
    if (!state.password.trim()) errors.password = 'Vui lòng nhập mật khẩu';
    dispatch({ type: 'SET_ERRORS', errors });
    if (Object.keys(errors).length > 0) return;

    const res = await login(state.username.trim(), state.password);
    if (!res.success) {
      dispatch({ type: 'SUBMIT_ERROR', message: res.message || 'Đăng nhập thất bại' });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4 text-center">Đăng nhập</h3>
              {state.submitError && <Alert variant="danger">{state.submitError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginUsername">
                  <Form.Label>Tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.username}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'username', value: e.target.value })}
                    placeholder="Nhập username"
                    isInvalid={!!state.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{state.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={state.password}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                    placeholder="Nhập password"
                    isInvalid={!!state.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{state.errors.password}</Form.Control.Feedback>
                </Form.Group>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="primary" type="submit" style={{ flex: 1 }} disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button variant="secondary" style={{ flex: 1 }} onClick={handleReset} disabled={loading}
                  > Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;