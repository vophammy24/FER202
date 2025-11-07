import React, { useState } from 'react';
import { Table, Button, Spinner, Alert, Image, Badge, ButtonGroup } from 'react-bootstrap';
import { useUser } from '../hooks/useUser';
// Có thể import ConfirmModal ở đây nếu bạn muốn xác nhận trước khi Ban
import UserDetailModal from './UserDetailModal';
import ConfirmModal from './ConfirmModal';

const UserTable = ({ users: filteredUsers }) => {
    const { loading, error, banUser } = useUser();

    // Xác nhận hành động Ban/Unban qua modal
    const [confirmState, setConfirmState] = useState({ show: false, user: null, newStatus: null, actionText: '' });

    const openConfirm = (user) => {
        const newStatus = user.status === 'active' ? 'locked' : 'active';
        const actionText = newStatus === 'locked' ? 'khóa' : 'mở khóa';
        setConfirmState({ show: true, user, newStatus, actionText });
    };

    const handleConfirmBan = async () => {
        const { user, newStatus } = confirmState;
        if (!user || !newStatus) return;
        await banUser(user.id, newStatus);
        setConfirmState({ show: false, user: null, newStatus: null, actionText: '' });
    };

    const [detailUser, setDetailUser] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    // 2. Định nghĩa hành động View Details
    const handleViewDetails = (user) => {
        setDetailUser(user);
        setShowDetail(true);
    };

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" /> <p>Đang tải dữ liệu người dùng...</p></div>;
    }
    if (error) {
        return <Alert variant="danger">Lỗi tải dữ liệu: {error}</Alert>;
    }
    if (filteredUsers.length === 0) {
        return <Alert variant="info" className="text-center">Không tìm thấy người dùng nào phù hợp với bộ lọc.</Alert>;
    }

    // 3. Render Bảng
    return (
        <>
        <Table striped bordered hover responsive className="mb-0">
            <thead style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
                <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map((user) => (
                    <tr key={user.id} className="align-middle">
                        <td>{user.id}</td>
                        <td>
                            {/* Giả định avatar được lưu dưới dạng path trong db-pt2.json */}
                            <Image 
                                src={user.avatar || '/images/default.png'} 
                                roundedCircle 
                                width="40" 
                                height="40" 
                                alt={user.username}
                                className="shadow-sm" 
                            />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.fullName}</td>
                        <td>
                            <Badge bg={user.role === 'admin' ? 'primary' : 'secondary'}>{user.role}</Badge>
                        </td>
                        <td>
                            <Badge bg={user.status === 'active' ? 'success' : 'danger'}>
                                {user.status === 'active' ? 'Active' : 'Locked'}
                            </Badge>
                        </td>
                        <td className="text-center" style={{ width: '220px' }}>
                            <ButtonGroup size="sm">
                                <Button variant="info" onClick={() => handleViewDetails(user)}>View Details</Button>
                                <Button 
                                    variant={user.status === 'active' ? 'danger' : 'success'} 
                                    onClick={() => openConfirm(user)}
                                >
                                    {user.status === 'active' ? 'Ban' : 'Unban'}
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <UserDetailModal show={showDetail} user={detailUser} onHide={() => setShowDetail(false)} />
        <ConfirmModal
            show={confirmState.show}
            title={confirmState.newStatus === 'locked' ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở khóa'}
            message={confirmState.user ? (
                <>
                    Bạn có chắc chắn muốn {confirmState.actionText} tài khoản
                    {' '}<strong>{confirmState.user.username}</strong> không?
                </>
            ) : null}
            confirmLabel={confirmState.newStatus === 'locked' ? 'Khóa' : 'Mở khóa'}
            confirmVariant={confirmState.newStatus === 'locked' ? 'danger' : 'success'}
            onConfirm={handleConfirmBan}
            onHide={() => setConfirmState({ show: false, user: null, newStatus: null, actionText: '' })}
        />
        </>
    );
};

export default UserTable;