import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import UserListPage from "../components/UserListPage";

const PrivateRoute = ({ children }) => {
    // Lấy trực tiếp isAuthenticated từ useAuth()
    const { isAuthenticated } = useAuth(); 
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* 2. Trang Đăng nhập */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home ) */}
            <Route 
                path="/home" 
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } 
            />

            <Route
                path="/userlist"
                element = {
                    <PrivateRoute>
                        <UserListPage /> {/* Sử dụng page mới */}
                    </PrivateRoute>
                }
            />
            
            {/* 4. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};

export default AppRoutes;
