import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const defaultFilters = {
    search: '',
    role: '',
    status: '',
    sort: '',
};

const UserFilter = ({ initialFilters = {}, onFiltersChange }) => {
    const [filters, setFilters] = useState(() => ({
        ...defaultFilters,
        ...initialFilters,
    }));

    useEffect(() => {
        if (typeof onFiltersChange === 'function') {
            onFiltersChange(filters);
        }
    }, [filters, onFiltersChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mb-0">
            <Row className="g-3 align-items-end">
                {/* Search Field */}
                <Col md={6}>
                    <Form.Group controlId="filterSearch">
                        <Form.Label>Tìm kiếm người dùng</Form.Label>
                        <Form.Control
                            type="text"
                            name="search"
                            value={filters.search || ''}
                            onChange={handleChange}
                            placeholder="Tìm theo Username, FullName, Email..."
                        />
                    </Form.Group>
                </Col>

                {/* Filter Role */}
                <Col md={2}>
                    <Form.Group controlId="filterRole">
                        <Form.Label>Lọc theo Role</Form.Label>
                        <Form.Select name="role" value={filters.role || ''} onChange={handleChange}>
                            <option value="">Tất cả Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Filter Status */}
                <Col md={2}>
                    <Form.Group controlId="filterStatus">
                        <Form.Label>Lọc theo Status</Form.Label>
                        <Form.Select name="status" value={filters.status || ''} onChange={handleChange}>
                            <option value="">Tất cả Status</option>
                            <option value="active">Active</option>
                            <option value="locked">Locked</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Sorting */}
                <Col md={2}>
                    <Form.Group controlId="filterSort">
                        <Form.Label>Sắp xếp</Form.Label>
                        <Form.Select name="sort" value={filters.sort || ''} onChange={handleChange}>
                            <option value="">Mặc định</option>
                            <option value="nameAsc">Tên A - Z</option>
                            <option value="nameDesc">Tên Z - A</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
};

export default UserFilter;