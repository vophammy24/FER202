import { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import TotalExpensesCard from "../components/TotalExpensesCard";
import FilterCard from "../components/FilterCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpensesList from "../components/ExpensesList";
import Footer from "../components/Footer";
import { useExpenses } from "../hooks/useExpenses";

function HomePage() {
    const { expenses } = useExpenses();
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedExpense, setSelectedExpense] = useState(null);

    const filteredExpenses = useMemo(() => {
        if (!categoryFilter.trim()) {
            return expenses;
        }
        return expenses.filter(expense =>
            expense.category?.toLowerCase() === categoryFilter.toLowerCase()
        );
    }, [expenses, categoryFilter]);

    const handleEditClick = (expense) => {
        setSelectedExpense(expense);
    };

    const handleSave = () => {
        setSelectedExpense(null);
    };

    const handleCancel = () => {
        setSelectedExpense(null);
    };

    return (
        <>
            <Header />
            <Container className="py-4">
                <Row>
                    {/* Left Column */}
                    <Col md={4} className="mb-4">
                        <div className="mb-4">
                            <TotalExpensesCard />
                        </div>
                        <div>
                            <ExpenseForm 
                                expense={selectedExpense}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        </div>
                    </Col>

                    {/* Right Column */}
                    <Col md={8}>
                        <div className="mb-4">
                            <FilterCard onFilterChange={setCategoryFilter} />
                        </div>
                        <div>
                            <ExpensesList 
                                expenses={filteredExpenses}
                                onEditClick={handleEditClick}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
export default HomePage;