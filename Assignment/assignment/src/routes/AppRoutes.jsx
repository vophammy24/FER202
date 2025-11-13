import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); 
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* 2. Trang Đăng nhập */}
            <Route path="/login" element={<LoginPage />} />
            
            <Route 
                path="/home" 
                element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                } 
            />

            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};

export default AppRoutes;
