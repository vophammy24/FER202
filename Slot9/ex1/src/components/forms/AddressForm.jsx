import { Form, Row, Col } from "react-bootstrap";

const COUNTRIES = [
  "Viet Nam", "United States", "Canada", "United Kingdom", "Japan", "Korea", "France", "Germany", "Australia"
];

export default function AddressForm({ values, errors, onChange }) {
  return (
    <Form noValidate>
      <h5 className="mb-3"><i className="bi bi-geo-alt me-2" />Address Information</h5>

      <Row className="g-3">
        <Col md={12}>
          <Form.Label><i className="bi bi-signpost me-2" />Street *</Form.Label>
          <Form.Control
            value={values.street}
            isInvalid={!!errors.street}
            onChange={(e) => onChange("street", e.target.value)}
            placeholder="Enter your street address"
          />
          <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-buildings me-2" />City *</Form.Label>
          <Form.Control
            value={values.city}
            isInvalid={!!errors.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Enter your city"
          />
          <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-geo me-2" />State *</Form.Label>
          <Form.Control
            value={values.state}
            isInvalid={!!errors.state}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="Enter your state/province"
          />
          <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-mailbox me-2" />Zip Code *</Form.Label>
          <Form.Control
            value={values.zip}
            isInvalid={!!errors.zip}
            onChange={(e) => onChange("zip", e.target.value)}
            placeholder="Enter your zip/postal code"
          />
          <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label><i className="bi bi-flag me-2" />Country *</Form.Label>
          <Form.Select
            value={values.country}
            isInvalid={!!errors.country}
            onChange={(e) => onChange("country", e.target.value)}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
}
