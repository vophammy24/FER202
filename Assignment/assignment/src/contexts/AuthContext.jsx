import { createContext, useReducer} from 'react';
import { getUsers } from '../services/api';
import { validatePassword, validateUsername } from '../utils/validation';

const AuthContext = createContext();

const initialState = { 
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, loading: false, isAuthenticated: true, user: action.payload, error: null };

    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialState, isAuthenticated: false, user: null };

    case 'CLEAR_ERROR':
      return { ...state, error: null };
      
    default: 
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

  const login = async ({username, password}) => {

    const trimmedUsername = username ? username.trim() : '';
    const trimmedPassword = password ? password.trim() : '';

    let validationError = validateUsername(trimmedUsername);

    if (!validationError) {
      validationError = validatePassword(trimmedPassword);
    }

    if (validationError) {
      dispatch({ type: 'LOGIN_FAILURE', payload: validationError });
      return { success: false, error: validationError };
    }

    dispatch({ type: 'LOGIN_START' });

    try {

      const accounts = await getUsers();

      const user = accounts.find(acc => {
        return acc.username === trimmedUsername && acc.password === password;
      }
      );

      if (user){

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: user
        });
        return{ success: true, user};
      } else {
        const errorMessage = 'Invalid username or password';
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: errorMessage
        }); 
        return { success: false, error: errorMessage };
      }
    } catch (error) {

      const errorMessage = error.message || 'Login failed due to a network error.' 

      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: errorMessage 
      });
      return ({ success: false, error: errorMessage });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };


  const contextValue = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;