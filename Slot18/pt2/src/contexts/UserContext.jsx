import { createContext, useCallback, useReducer } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUsers, updateUser } from "../services/API";

const UserContext = createContext();

const initialState = { 
  user: null,
  users: [],
  loading: false,
  error: null,
  isAuthenticated: false
};

function userReducer(state, action) {
    switch (action.type) {
        case 'FETCH_USERS_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_USERS_SUCCESS':
            return { ...state, loading: false, users: action.payload };
        case 'FETCH_USERS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case 'UPDATE_USER_FAILURE':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { user: currentUser } = useAuth(); // Lấy thông tin user hiện tại

    // 1. Fetch Users
    const fetchUsers = useCallback(async () => {
        dispatch({ type: 'FETCH_USERS_START' });
        try {
            const allUsers = await getUsers();
            // 💡 Lọc user hiện tại ra khỏi danh sách hiển thị
            const filteredUsers = allUsers.filter(u => u.id !== currentUser?.id);
            dispatch({ type: 'FETCH_USERS_SUCCESS', payload: filteredUsers });
        } catch (error) {
            dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
        }
    }, [currentUser?.id]);

    // 2. Ban/Unban User
    const banUser = async (userId, newStatus) => {
        try {
            const updatedUser = await updateUser(userId, { status: newStatus });
            dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedUser });
            return { success: true, user: updatedUser };
        } catch (error) {
            dispatch({ type: 'UPDATE_USER_FAILURE', payload: `Không thể cập nhật trạng thái user ${userId}` });
            return { success: false, error: error.message };
        }
    };

    const contextValue = {
        ...state,
        fetchUsers,
        banUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;