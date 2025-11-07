import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Header from '../components/Header';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { useUser } from '../hooks/useUser';

function UserListPage() {
    const { users: allUsers, fetchUsers } = useUser();
    const [currentFilters, setCurrentFilters] = useState({});

    // Fetch users khi component mount
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Logic Lọc và Sắp xếp
    const filteredAndSortedUsers = useMemo(() => {
        let result = allUsers;
        const { search, role, status, sort } = currentFilters;

        // --- LỌC (Filter Logic) ---
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(u =>
                u.username.toLowerCase().includes(lowerSearch) ||
                u.fullName.toLowerCase().includes(lowerSearch) ||
                u.email?.toLowerCase().includes(lowerSearch)
            );
        }

        if (role) {
            result = result.filter(u => u.role === role);
        }

        if (status) {
            result = result.filter(u => u.status === status);
        }

        // --- SẮP XẾP (Sort Logic) ---
        if (sort) {
            result.sort((a, b) => {
                switch (sort) {
                    case 'nameAsc': return a.fullName.localeCompare(b.fullName);
                    case 'nameDesc': return b.fullName.localeCompare(a.fullName);
                    default: return 0;
                }
            });
        }
        
        return result;
    }, [allUsers, currentFilters]);

    const totalCount = allUsers.length;
    const visibleCount = filteredAndSortedUsers.length;

    return (
        <>
            <Header />
            <Container className='py-4'>
                <Row className="align-items-center mb-3">
                    <Col>
                        <h2 className="mb-0">User Management</h2>
                        <small className="text-muted">Quản lý tài khoản người dùng</small>
                    </Col>
                    <Col xs="auto">
                        <Badge bg="secondary" className="me-2">Total: {totalCount}</Badge>
                        <Badge bg="primary">Showing: {visibleCount}</Badge>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body className="pb-2">
                                <UserFilter onFiltersChange={setCurrentFilters} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <UserTable users={filteredAndSortedUsers} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserListPage;