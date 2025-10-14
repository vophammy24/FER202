// src/components/Filter/Filter.jsx
import { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, InputGroup, Badge } from "react-bootstrap";
import "./filter.css";


export default function Filter({ onChangeCriteria = () => {} }) {
  const [search, setSearch] = useState("");
  const [yearRange, setYearRange] = useState("all");
  const [sort, setSort] = useState("year-desc");


  useEffect(() => {
    onChangeCriteria({ search, yearRange, sort });
  }, [search, yearRange, sort, onChangeCriteria]);

  const resetAll = () => {
    setSearch("");
    setYearRange("all");
    setSort("year-desc");
  };
  const activeCount =
    (search ? 1 : 0) + (yearRange !== "all" ? 1 : 0) + (sort !== "year-desc" ? 1 : 0);

  return (
    <Card className="filter-card shadow-sm">
      <Card.Header className="d-flex align-items-center justify-content-between bg-white">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-funnel" />
          <span className="fw-semibold">Filter</span>
          {activeCount > 0 && <Badge bg="primary">{activeCount}</Badge>}
        </div>
        <Button variant="link" className="p-0 small" onClick={resetAll}>
          <i className="bi bi-arrow-counterclockwise me-1" /> Reset
        </Button>
      </Card.Header>

      <Card.Body>
        <Row className="gy-3 align-items-end">

          <Col xs={12} lg={6}>
            <Form.Label className="mb-1">
              <i className="bi bi-search me-2" />Search
            </Form.Label>
            <InputGroup className="filter-input">
              <Form.Control
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or description…"
                aria-label="Search movies"
              />
              {search && (
                <Button variant="outline-secondary" onClick={() => setSearch("")} aria-label="Clear">
                  <i className="bi bi-x-lg" />
                </Button>
              )}
            </InputGroup>
          </Col>

          <Col xs={6} lg={3}>
            <Form.Label className="mb-1">
              <i className="bi bi-calendar3 me-2" />Year
            </Form.Label>
                <Form.Select value={yearRange} onChange={(e) => setYearRange(e.target.value)}>
                <option value="all">All years</option>
                <option value="lte2000">Before 2000</option>
                <option value="2001-2015">2001 – 2015</option>
                <option value="gte2016">2015 - Now</option>
            </Form.Select>
          </Col>

          <Col xs={6} lg={3}>
            <Form.Label className="mb-1">
              <i className="bi bi-arrow-down-up me-2" />Sorting
            </Form.Label>
            <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <optgroup label="Year">
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
              </optgroup>
              <optgroup label="Title">
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
              </optgroup>
              <optgroup label="Duration">
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </optgroup>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}