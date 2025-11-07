import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Form} from 'react-bootstrap';

const normalizeOption = (option, fallbackKey) => {
  if (!option) return null;

  if (typeof option === 'string' || typeof option === 'number') {
    const value = String(option);
    return { value, label: value };
  }

  const value = option.value ?? option.id ?? option.code ?? option[fallbackKey];
  const label = option.label ?? option.name ?? option.title ?? option[fallbackKey] ?? value;

  if (!value && value !== 0) return null;

  return { value: String(value), label: String(label ?? value) };
};

const defaultFilters = {
  search: '',
  semester: '',
  course: '',
  sort: '',
};

const FilterBar = ({
  semesters = [],
  courses = [],
  initialFilters,
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    ...(initialFilters || {}),
  }));

  useEffect(() => {
    if (!initialFilters) return;
    setFilters((prev) => ({
      ...prev,
      ...initialFilters,
    }));
  }, [initialFilters]);

  useEffect(() => {
    if (typeof onFiltersChange === 'function') {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const derivedSemesterOptions = useMemo(() => (
    Array.isArray(semesters) ? semesters : []
  )
    .map((option) => normalizeOption(option, 'semesterName'))
    .filter(Boolean), [semesters]);

  const derivedCourseOptions = useMemo(() => (
    Array.isArray(courses) ? courses : []
  )
    .map((option) => normalizeOption(option, 'courseName'))
    .filter(Boolean), [courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-3 border rounded bg-light">
      <Row className="g-3">
        <Col md={4}>
          <Form.Group controlId="filterSearch">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              name="search"
              value={filters.search || ''}
              onChange={handleChange}
              placeholder="Search by semester or course name"
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="filterSemester">
            <Form.Label>Filter by Semester</Form.Label>
            <Form.Select
              name="semester"
              value={filters.semester || ''}
              onChange={handleChange}
            >
              <option value="">All semesters</option>
              {derivedSemesterOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="filterCourse">
            <Form.Label>Filter by Course</Form.Label>
            <Form.Select
              name="course"
              value={filters.course || ''}
              onChange={handleChange}
            >
              <option value="">All courses</option>
              {derivedCourseOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="filterSort">
            <Form.Label>Sorting</Form.Label>
            <Form.Select
              name="sort"
              value={filters.sort || ''}
              onChange={handleChange}
            >
              <option value="">Select sorting</option>
              <option value="nameAsc">By Course name A - Z</option>
              <option value="nameDesc">By Course name Z - A</option>
              <option value="dateAsc">By Date ascending</option>
              <option value="dateDesc">By Date descending</option>
              <option value="amountAsc">By Amount ascending</option>
              <option value="amountDesc">By Amount descending</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;


