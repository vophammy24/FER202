import { useState } from "react";
import { Card, Col, Form, Row } from 'react-bootstrap';

const accounts = [
    { id: 1, username: "hero", password: "1234", avatar: "/avt1.jpeg"},
    { id: 2, username: "fire", password: "1234", avatar: "/avt2.jpeg"},
    { id: 3, username: "water", password: "1234", avatar: "/avt3.jpeg"},
    { id: 4, username: "nature", password: "1234", avatar: "/avt4.jpeg"},
    { id: 5, username: "air", password: "1234", avatar: "/avt5.jpeg"},
    { id: 6, username: "babyboo", password: "1234", avatar: "/avt6.jpeg"}
];

function Search () {
    const [searchbyUsername, setSearchbyUsername] = useState("");

    const results = accounts.filter(
        account => account.username.toLowerCase().includes(searchbyUsername.toLowerCase())
    )

    return (
        <div
        style={{
            margin: '40px auto',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            background: '#f7fafd',
        }} 
        className = "container"
        >
        <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>
            Tìm kiếm theo username
        </h3>
        <input
            type="text"
            value={searchbyUsername}
            onChange={(e) => setSearchbyUsername(e.target.value)}
            placeholder="Tìm kiếm theo username..."
            style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1.5px solid #90caf9',
            marginBottom: 18,
            fontSize: 16,
            outline: 'none',
            boxSizing: 'border-box',
            }}
        />
          <Row className="g-3">
            {results.map((account) => (
            <Col key={account.id} md={4}>
                <Card className="shadow-sm">
                  <Card.Img
                    variant="top"
                    src={account.avatar}
                    alt={account.username}
                    style={{ objectFit: "cover", height: 250}}
                  />
                  <Card.Body>
                    <Card.Title className="mb-1">{account.username}</Card.Title>
                    <Card.Subtitle className="text-muted mb-2">
                      ID: {account.id}
                    </Card.Subtitle>

                    <div className="d-flex align-items-center gap-2">
                      <Form.Label className="m-0 text-muted">Password: {account.password} </Form.Label>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {results.length === 0 && (
              <p>Không tìm thấy kết quả</p>
            )

            }
            </Row>
        </div>
    );

}
export default Search
