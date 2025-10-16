import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Toast, ToastContainer, Modal, Card } from "react-bootstrap";

const isTrimmed = (v) => typeof v === "string" && v.trim() === v;
const isUsername = (v) =>
  typeof v === "string" &&
  isTrimmed(v) &&
  /^[A-Za-z0-9._]{3,}$/.test(v);
const isEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
const isPasswordStrong = (v) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(String(v || ""));
const isConfirmMatch = (confirm, password) =>
  String(confirm || "").length > 0 && confirm === password;

function validateAll({ username, email, password }, confirm) {
  const errs = {};
  if (!username) errs.username = "Username is required";
  else if (!isTrimmed(username)) errs.username = "Không có khoảng trắng ở đầu/cuối.";
  else if (!isUsername(username))
    errs.username = "Username ≥ 3, chỉ chữ/số/_/., không khoảng trắng đầu/cuối.";

  if (!email) errs.email = "Email is required";
  else if (!isEmail(email)) errs.email = "Email không đúng định dạng.";

  if (!password) errs.password = "Password is required";
  else if (!isPasswordStrong(password))
    errs.password = "Password ≥ 8, có hoa, thường, số, ký tự đặc biệt.";

  if (!confirm) errs.confirm = "Confirm password is required";
  else if (!isConfirmMatch(confirm, password)) errs.confirm = "Confirm password không trùng khớp.";

  return errs;
}

export default function SignUp() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [showToast, setshowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [liveValidation, setLiveValidation] = useState(false);

  useEffect(() => {
    if (liveValidation) setErrors(validateAll(user, confirm));
    else setErrors({});
  }, [user, confirm, liveValidation]);

  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirm") setConfirm(value);
    else setUser((prev) => ({ ...prev, [name]: value }));
    if (!liveValidation && value.trim() !== "") setLiveValidation(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setshowToast(true);
    setShowModal(true);
  };

  const handleCancel = () => {
    setUser({ username: "", email: "", password: "" });
    setConfirm("");
    setErrors({});
    setLiveValidation(false);
    setshowToast(false);
    setShowModal(false);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <h3 className="fw-bold mb-3 text-center">Sign Up</h3>

          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="f-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="e.g. john.smith"
                value={user.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="f-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                value={user.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="f-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="••••••••"
                value={user.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              {/* <Form.Text muted>
                Tối thiểu 8 ký tự, phải có chữ hoa, thường, số, ký tự đặc biệt.
              </Form.Text> */}
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="f-confirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                placeholder="Nhập lại password"
                value={confirm}
                onChange={handleChange}
                isInvalid={!!errors.confirm}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirm}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={!isFormValid}>
                Submit
              </Button>
              <Button type="button" variant="outline-secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      <ToastContainer position="top-center" className="p-3" containerPosition="fixed">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setshowToast(false)}
          delay={5000}
          autohide
        >
          <Toast.Body className="text-white text-center">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Card className="m-0">
          <Card.Header className="fw-bold">Thông tin đã gửi</Card.Header>
          <Card.Body>
            <p className="mb-1"><strong>Username:</strong> {user.username}</p>
            <p className="mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="text-muted mb-0"><strong>Password:</strong> {user.password}</p>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="outline-secondary" onClick={handleCancel}>
              Reset form
            </Button>
          </Card.Footer>
        </Card>
      </Modal>
    </Container>
  );
}