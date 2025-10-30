import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import movieApi from '../api/movieAPI';

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

export const useAuth = () => {
  const state = useContext(AuthStateContext);
  const actions = useContext(AuthDispatchContext);
  if (!state || !actions) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return { ...state, ...actions };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const res = await movieApi.get('/accounts', { params: { username, password } });
      const matched = Array.isArray(res.data) ? res.data[0] : null;
      if (matched) {
        const loggedUser = { username: matched.username };
        setUser(loggedUser);
        localStorage.setItem('auth:user', JSON.stringify(loggedUser));
        return { success: true };
      }
      return { success: false, message: 'Sai tài khoản hoặc mật khẩu' };
    } catch (e) {
      return { success: false, message: 'Không thể kết nối máy chủ' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth:user');
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('auth:user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const stateValue = useMemo(() => ({ user, isAuthenticated, loading }), [user, isAuthenticated, loading]);
  const actionsValue = useMemo(() => ({ login, logout }), [login, logout]);

  return (
    <AuthStateContext.Provider value={stateValue}>
      <AuthDispatchContext.Provider value={actionsValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};


