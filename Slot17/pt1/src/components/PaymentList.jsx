import { useState } from "react";
import { usePayment } from "../hooks/usePayment";
import { Alert, Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";
import {formatCurrency, formatDate} from '../utils/formatters'
import PaymentFormModal from "./PaymentFormModal";

const PaymentList = ({ payments: filteredPayments}) => {
    const {
        loading,
        error,
        deletePayment: deletePaymentAction,
    } = usePayment();

    const payments = filteredPayments || [];

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleOpenEditModal = (payment) => {
        setSelectedPayment(payment);
        setShowEditModal(true);
    };
    
    const handleOpenDeleteConfirm = (payment) => {
        setSelectedPayment(payment);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedPayment) return;
        
        setShowDeleteConfirm(false); 
        
        // Gọi action xóa từ Context
        const result = await deletePaymentAction(selectedPayment.id);
        
        if (result.success) {
            // Có thể thêm Toast/Success Alert tại đây
            setSelectedPayment(null); 
        } else {
            // Xử lý lỗi nếu xóa không thành công
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
        <Row className="mb-3 align-items-center">
            <Col xs={6}>
            <h4>Danh Sách Thanh Toán</h4>
            </Col>
            <Col xs={6} className="text-end">
            {/* Nút Thêm Payment ở góc phải component */}
            <Button variant="success" onClick={handleOpenAddModal}>
                 Thêm Thanh Toán Mới
            </Button>
            </Col>
        </Row>

        {payments.length === 0 ? (
            <Alert variant="info" className="text-center">
                Không tìm thấy dữ liệu thanh toán nào phù hợp.
            </Alert>
        ) : (
            <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Kỳ Học</th>
                <th>Tên Khóa Học</th>
                <th>Số Tiền</th>
                <th>Ngày Thanh Toán</th>
                <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment, index) => (
                <tr key={payment.id}>
                    <td>{index + 1}</td>
                    <td>{payment.semester}</td>
                    <td>{payment.courseName}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>{formatDate(payment.date)}</td>
                    <td className="text-center" style={{ width: '150px' }}>
                    {/* Nút Update */}
                    <Button 
                        variant="info" 
                        size="sm" 
                        className="me-2" 
                        onClick={() => handleOpenEditModal(payment)}
                    > Sửa
                    </Button>
                    {/* Nút Delete */}
                    <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleOpenDeleteConfirm(payment)}
                    > Xóa
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        )}
        
        <PaymentFormModal 
            show={showAddModal} 
            onHide={() => setShowAddModal(false)} 
            type="add" 
        />

        <PaymentFormModal 
            show={showEditModal} 
            onHide={() => setShowEditModal(false)} 
            type="edit" 
            payment={selectedPayment} 
        />
        
        {/* Modal xác nhận xóa (Sử dụng ConfirmModal) */}
        <ConfirmModal
            show={showDeleteConfirm}
            title="Xác Nhận Xóa Thanh Toán"
            message={`Bạn có chắc chắn muốn xóa thanh toán cho khóa học "${selectedPayment?.courseName}" (${formatCurrency(selectedPayment?.amount)}) không? Hành động này không thể hoàn tác.`}
            onConfirm={handleConfirmDelete}
            onHide={() => setShowDeleteConfirm(false)}
            // Các props tùy chỉnh cho nút
            confirmText="Xóa"
            cancelText="Hủy"
            variant="danger" 
        />
        </Card>
    );
}

export default PaymentList;