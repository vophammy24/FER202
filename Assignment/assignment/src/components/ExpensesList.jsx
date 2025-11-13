import { useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import { Alert, Button, Card, Spinner, Table } from "react-bootstrap";
import { formatCurrency, formatDate } from '../utils/formmated';
import ConfirmModal from "./ConfirmModal";

const ExpensesList = ({ expenses: filteredExpenses, onEditClick }) => {
    const {
        expenses: contextExpenses,
        loading,
        error,
        deleteExpense: deleteAction,
    } = useExpenses();

    const expenses = filteredExpenses || contextExpenses || [];
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleOpenEdit = (expense) => {
        if (onEditClick) {
            onEditClick(expense);
        }
    };

    const handleOpenDeleteConfirm = (expense) => {
        setSelectedExpense(expense);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedExpense) return;
        
        setShowDeleteConfirm(false); 
        
        const result = await deleteAction(selectedExpense.id);
        
        if (result.success) {
            setSelectedExpense(null);
        } else {
            console.error('Delete failed:', result.error);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
            <Spinner animation="border" role="status" className="me-2" />
            <p>Đang tải dữ liệu thanh toán...</p>
            </div>
        );
        }

    if (error) {
        return <Alert variant="danger">Lỗi tải dữ liệu: {error}</Alert>;
    }

    return (
        <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">Expense Management</Card.Title>

            {expenses.length === 0 ? (
                <Alert variant="info" className="text-center">
                    Không tìm thấy dữ liệu thanh toán nào phù hợp.
                </Alert>
            ) : (
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.name}</td>
                                <td>{formatCurrency(expense.amount)}</td>
                                <td>{expense.category}</td>
                                <td>{formatDate(expense.date)}</td>
                                <td className="text-center" style={{ width: '150px' }}>
                                    <Button 
                                        variant="warning" 
                                        size="sm" 
                                        className="me-2" 
                                        onClick={() => handleOpenEdit(expense)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        onClick={() => handleOpenDeleteConfirm(expense)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteConfirm}
                title="Confirm Delete"
                message={`Are you sure you want to delete expense "${selectedExpense?.name}" (${formatCurrency(selectedExpense?.amount)})? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onHide={() => {
                    setShowDeleteConfirm(false);
                    setSelectedExpense(null);
                }}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger" 
            />
        </Card>
    );
}

export default ExpensesList;