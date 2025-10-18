import { useReducer} from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";

const initialState = {
    username: '',
    password: '',
    errors: { username: "", password: "" },
    isLoggedIn: false,
    showModal: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
                errors: { ...state.errors, [action.field]: "" },
            };
        case 'SUBMIT': {
            const errors = {
                username: state.username.trim() === '' ? 'Username is required' : '',
                password: state.password.trim() === '' ? 'Password is required' : '',
            }; 
            const hasError = errors.username || errors.password;

            if (hasError) {
                return { ...state, errors, isLoggedIn: false, showModal: false }
            }
                return { ...state, errors, isLoggedIn: true, showModal: true};
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                showModal: false,
                username: '',
                password: ''
            };
        default:
            return state;
    }
}

export default function LoginForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SUBMIT' });
    };

    const onChange = (field) => (e) =>
        dispatch({ type: 'SET_FIELD', field, value: e.target.value });

    return(
        <div>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h3 className="text-center">Login</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>  
                                    <Form.Group controlId="username" className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            value={state.username}
                                            onChange={onChange('username')} 
                                            isInvalid={!!state.errors.username}
                                            placeholder="Enter username"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {state.errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="password" className="mb-3">  
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password"
                                            value={state.password}
                                            onChange={onChange('password')} 
                                            isInvalid={!!state.errors.password}   
                                            placeholder="Enter password"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {state.errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>   
                                    <Button variant="primary" type="submit" className="w-100">
                                        Login
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Modal show={state.showModal} onHide={() => dispatch({type: "CLOSE_MODAL"})} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-success text-center">Welcome, <strong>{state.username}</strong>!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => dispatch({type: "CLOSE_MODAL"})}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <hr/>
        </div>
    );
}