import { Col, Container, Row } from "react-bootstrap";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import PaymentList from "../components/PaymentList";
import { usePayment } from "../hooks/usePayment";
import { useEffect, useMemo, useState } from "react";

function Dashboard () {
    const { payments: allPayments, fetchPayments } = usePayment();
    
    const [currentFilters, setCurrentFilters] = useState({});

    useEffect(() => {
      fetchPayments();
    }, [fetchPayments]);

    const filteredAndSortedPayments = useMemo(() => {
        let result = allPayments;
        const { search, semester, course, sort } = currentFilters;

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(p =>
                p.semester.toLowerCase().includes(lowerSearch) ||
                p.courseName.toLowerCase().includes(lowerSearch)
            );
        }

        if (semester) {
            result = result.filter(p => p.semester === semester);
        }

        if (course) {
            result = result.filter(p => p.courseName === course);
        }

        if (sort) {
            result.sort((a, b) => {
                switch (sort) {
                    case 'nameAsc': return a.courseName.localeCompare(b.courseName);
                    case 'nameDesc': return b.courseName.localeCompare(a.courseName);
                    case 'dateAsc': return new Date(a.date) - new Date(b.date);
                    case 'dateDesc': return new Date(b.date) - new Date(a.date);
                    case 'amountAsc': return a.amount - b.amount;
                    case 'amountDesc': return b.amount - a.amount;
                    default: return 0;
                }
            });
        }
        
        return result;
    }, [allPayments, currentFilters]);


    const uniqueSemesters = useMemo(() => {
        const set = new Set(allPayments.map(p => p.semester));
        return Array.from(set).map(s => ({ value: s, label: s }));
    }, [allPayments]);

    const uniqueCourses = useMemo(() => {
        const set = new Set(allPayments.map(p => p.courseName));
        return Array.from(set).map(c => ({ value: c, label: c }));
    }, [allPayments]);

    return (
        <>
            <Header/>
            <Container className='py-4'>
                <Row className="mb-4">
                    <Col>
                        {/* Truyền options và hàm cập nhật bộ lọc xuống FilterBar */}
                        <FilterBar 
                            semesters={uniqueSemesters}
                            courses={uniqueCourses}
                            onFiltersChange={setCurrentFilters}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Truyền dữ liệu đã lọc và sắp xếp xuống PaymentList */}
                        <PaymentList payments={filteredAndSortedPayments} />
                        {/* Ghi chú: PaymentList sẽ tự xử lý loading và error của context */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Dashboard;