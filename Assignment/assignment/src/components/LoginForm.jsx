import { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { validateUsername, validatePassword } from '../utils/validation';

const initialFormState = {
  formData: {
    username: '', 
    password: '',
  },
  errors: {},
  showSuccessModal: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { 
        ...state,
        formData: { 
          ...state.formData,
          [action.field]: action.value
        },
      };
    case 'SET_ERRORS': 
      return {
          ...state,
          errors: action.errors
      };
    case 'SHOW_SUCCESS_MODAL':
      return {
          ...state, 
          showSuccessModal: true
      };
    case 'CLOSE_SUCCES_MODAL':
      return {
          ...state,
          showSuccessModal: false
      }
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  const { login, loading, error, clearError, user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    dispatch({ type: 'SET_FIELD', field: name, value });

    if (error) clearError();

    let message = '';
    
    if (name === 'username') {
      const usernameError = validateUsername(value.trim());
      if (usernameError) {
        message = usernameError;
      }
    } else if (name === 'password') {
      const passwordError = validatePassword(value);
      if (passwordError) {
        message = passwordError;
      }
    }

    if (message) {
      dispatch({ type: 'SET_ERROR', field: name, message });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const validateForm = () => {
    const errors = {};
    const { username, password } = formState.formData;
    
    const trimmedUsername = username.trim();
    
    const usernameError = validateUsername(trimmedUsername);
    if (usernameError) {
      errors.username = usernameError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError(); 
    
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const result = await login({ 
        username: formState.formData.username.trim(),
        password: formState.formData.password,
      });

      if (result && result.success) { 
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleReset = () => { 
    dispatch({ type: 'RESET_FORM' });
    if (error) clearError();
  };

  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    navigate('/home'); 
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" className="mb-3" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formState.formData.username}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.username}
                    placeholder="Enter username"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.formData.password} // Lấy từ formData
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                  {/* Form.Control.Feedback: Hiển thị lỗi validation */}
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" animation="border" role="status" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button" 
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
                
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thông báo thành công, gọi ConfirmModal */}
      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful!"
        message={`Welcome, ${user?.username}!, login successful.`}
        onConfirm={handleCloseSuccessModal}
        onHide={handleCloseSuccessModal}
      />
    </Container>
  );
}

export default LoginForm;
