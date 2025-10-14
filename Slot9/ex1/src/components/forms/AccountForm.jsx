import { useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";

const QUESTIONS = [
  "What is your first pet's name?",
  "What is your nickname?",
  "What was the name of your first school?",
  "What city were you born in?"
];

export default function AccountForm({ values, errors, onChange }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  return (
    <Form noValidate>
      <h5 className="mb-3"><i className="bi bi-shield-lock me-2" />Account Information</h5>

      <Row className="g-3">
        <Col md={12}>
          <Form.Label><i className="bi bi-person-badge me-2" />Username *</Form.Label>
          <Form.Control
            value={values.username}
            isInvalid={!!errors.username}
            onChange={(e) => onChange("username", e.target.value)}
            placeholder="Enter your username"
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-lock me-2" />Password *</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type={showPwd ? "text" : "password"}
              value={values.password}
              isInvalid={!!errors.password}
              onChange={(e) => onChange("password", e.target.value)}
              placeholder="Enter your password"
            />
            <Button variant="outline-secondary" onClick={() => setShowPwd(s => !s)}>
              <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`} />
            </Button>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-lock-fill me-2" />Confirm Password *</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type={showPwd2 ? "text" : "password"}
              value={values.confirmPassword}
              isInvalid={!!errors.confirmPassword}
              onChange={(e) => onChange("confirmPassword", e.target.value)}
              placeholder="Re-enter password"
            />
            <Button variant="outline-secondary" onClick={() => setShowPwd2(s => !s)}>
              <i className={`bi ${showPwd2 ? "bi-eye-slash" : "bi-eye"}`} />
            </Button>
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-question-circle me-2" />Secret Question *</Form.Label>
          <Form.Select
            value={values.secretQuestion}
            isInvalid={!!errors.secretQuestion}
            onChange={(e) => onChange("secretQuestion", e.target.value)}
          >
            <option value="">Select a question</option>
            {QUESTIONS.map((q) => <option key={q} value={q}>{q}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-key me-2" />Answer *</Form.Label>
          <Form.Control
            value={values.answer}
            isInvalid={!!errors.answer}
            onChange={(e) => onChange("answer", e.target.value)}
            placeholder="Enter your answer"
          />
          <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
}
