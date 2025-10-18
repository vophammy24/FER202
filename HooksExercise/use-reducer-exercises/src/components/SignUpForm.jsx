import { useMemo, useReducer } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Toast } from "react-bootstrap";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isUsername = (value) => /^[a-zA-Z0-9._]{3,}$/.test(value);
const isPasswordStrong = (value) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value);
const isTrimmed = (value) => value === value.trim();

function isValueField (field, value, form) {
    switch(field) {
        case "username": {
            if (!value.trim()) return "Username is required";
            if(!isTrimmed(value)) return "Không có khoảng trắng ở đầu/cuối.";
            if(!isUsername(value)) return "Username ≥ 3, chỉ chữ/số/_/., không khoảng trắng đầu/cuối.";
            return "";
        }
        case "email": {
            if (!value.trim()) return "Email is required";
            if(!isEmail(value)) return "Email không đúng định dạng.";
            return "";
        }
        case "password": {
            if (!value) return "Password is required";
            if(!isPasswordStrong(value)) return "Password ≥ 8, có hoa, thường, số, ký tự đặc biệt.";
            return "";
        }
        case "confirm": {
            if (!value) return "Confirm password is required";
            if (value !== form.password) return "Confirm password không trùng khớp.";
            return "";
        }
        default:
            return "";
    }
}

function validateAll(form) {
    return {
        username: isValueField("username", form.username, form),
        email: isValueField("email", form.email, form),
        password: isValueField("password", form.password, form),
        confirm: isValueField("confirm", form.confirm, form),
    }
}

const initialState = {
    form: { username: "", email: "", password: "", confirm: "" },
    errors: {},
    showToast: false,
    showModal: false
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_FIELD": {
            const form = { ...state.form, [action.field]: action.value };
            const fieldError = isValueField(action.field, action.value, form);
            let confirmError = state.errors.confirm;
            if (action.field === "password") {
                confirmError = isValueField("confirm", form.confirm, form);
            }
            const errors = {
                ...state.errors,
                [action.field]: fieldError,
                ...(action.field === "password" ? { confirm: confirmError } : {}),
            };

            return { ...state, form, errors };
        }
        case "SUBMIT": {
            const errors = validateAll(state.form);
            const hasError = Object.values(errors).some((error) => error !== "");
            if (hasError) {
                return { ...state, errors, showToast: false, showModal: false };
            }
            return { ...state, errors: {}, showToast: true, showModal: true };
        }
        case "CANCEL":
            return { ...initialState };
        case "CLOSE_MODAL":
            return { 
                ...state, 
                showModal: false,
                ...initialState
             };
        case "HIDE_TOAST":
            return { ...state, showToast: false };
        default:
            return state;
    }
}

export default function SignUpForm() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { form, errors, showModal, showToast } = state;

    const formErrors = useMemo(() => validateAll(form), [form]);

    const isValid = Object.values(formErrors).every((e) => !e);

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "SUBMIT" });
    };
    const handleCancel = () => dispatch({ type: "CANCEL" });

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={7}>
                    <Card>
                        <Card.Header>
                        <h3 className="text-center m-0">Sign Up</h3>
                        </Card.Header>
                        <Card.Body>
                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={onChange}
                                isInvalid={!!errors.username}
                                placeholder="Enter username"
                                autoComplete="username"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                isInvalid={!!errors.email}
                                placeholder="Enter email"
                                autoComplete="email"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                isInvalid={!!errors.password}
                                placeholder="Enter password"
                                autoComplete="new-password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="confirm" className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirm"
                                value={form.confirm}
                                onChange={onChange}
                                isInvalid={!!errors.confirm}
                                placeholder="Confirm password"
                                autoComplete="new-password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirm}
                            </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex gap-2">
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                                disabled={!isValid}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="outline-secondary"
                                type="button"
                                onClick={handleCancel}
                                className="w-100"
                            >
                                Cancel
                            </Button>
                            </div>
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Toast thông báo submit thành công */}
            <Toast
                show={showToast}
                onClose={() => dispatch({ type: "HIDE_TOAST" })}
                delay={2000}
                autohide
                style={{
                position: "fixed",
                top: 20,
                right: 20,
                minWidth: 240,
                zIndex: 1060,
                }}
            >
                <Toast.Header>
                <strong className="me-auto text-success">Success</strong>
                </Toast.Header>
                <Toast.Body>Submitted successfully!</Toast.Body>
            </Toast>

            {/* Modal hiển thị thông tin đã submit; Close = reset form */}
            <Modal show={showModal} onHide={() => dispatch({ type: "CLOSE_MODAL" })} centered>
                <Modal.Header closeButton>
                <Modal.Title>Sign Up Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Card>
                    <Card.Body>
                    <p><strong>Username:</strong> {form.username}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Password:</strong> {form.password}</p>
                    </Card.Body>
                </Card>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}