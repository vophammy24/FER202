import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="mt-5 py-3 bg-light">
            <Container>
                <Row>
                    <Col className="text-start">
                        © 2025 PersonalBudget Demo
                    </Col>
                    <Col className="text-end">
                        Built with React, Redux Toolkit & JSON Server
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}