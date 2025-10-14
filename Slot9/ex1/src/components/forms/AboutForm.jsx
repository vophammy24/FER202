import { Form, Row, Col } from "react-bootstrap";

export default function AboutForm({ values, errors, onChange }) {
  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    onChange("avatar", file);
  };

  return (
    <Form noValidate>
      <h5 className="mb-3"><i className="bi bi-info-circle me-2" />About Information</h5>

      <Row className="g-3">
        <Col md={12}>
          <Form.Label><i className="bi bi-person-fill me-2" />First Name *</Form.Label>
          <Form.Control
            value={values.firstName}
            isInvalid={!!errors.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Enter your First Name"
          />
          <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-person-fill me-2" />Last Name *</Form.Label>
          <Form.Control
            value={values.lastName}
            isInvalid={!!errors.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Enter your Last Name"
          />
          <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-envelope-fill me-2" />Email *</Form.Label>
          <Form.Control
            type="email"
            value={values.email}
            isInvalid={!!errors.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Enter your Email"
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-telephone-fill me-2" />Phone *</Form.Label>
          <Form.Control
            inputMode="numeric"
            value={values.phone}
            isInvalid={!!errors.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Enter your Phone Number"
            maxLength={10}
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-person-fill me-2" />Age *</Form.Label>
          <Form.Control
            inputMode="numeric"
            value={values.age}
            isInvalid={!!errors.age}
            onChange={(e) => onChange("age", e.target.value)}
            placeholder="Enter your Age"
          />
          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-image me-2" />Avatar</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFile}
          />
          <Form.Text muted>JPG/PNG/JPEG • Optional</Form.Text>
        </Col>
      </Row>
    </Form>
  );
}
