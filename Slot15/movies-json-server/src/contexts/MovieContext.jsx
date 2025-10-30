import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI'; // Import Axios

// Contexts
export const MovieStateContext = createContext(initialMovieState); 
export const MovieDispatchContext = createContext(null);          

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// MovieProvider Component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // Hàm READ: Tải lại dữ liệu (Axios GET)
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
      console.error("Lỗi khi tải danh sách phim:", error);
      // Giữ state cũ nếu lỗi (hoặc [] nếu ban đầu chưa có)
      dispatch({ type: 'SET_MOVIES', payload: [] }); 
    }
  }, [dispatch]); 

  const fetchGenres = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/genres');
      dispatch({type: 'SET_GENRES', payload: response.data});
    } catch (error) {
      console.error("Lỗi khi tải danh sách thể loại:", error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, [dispatch]);
  
  // Hàm DELETE: Xóa phim (Axios DELETE)
  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });

    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies(); // Tải lại dữ liệu
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      fetchMovies(); // Reload to get current state from server
    }
  }, [fetchMovies]);

  // Hàm CREATE/UPDATE: Xử lý POST và PUT (Axios POST/PUT)
  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    
    try {
      if (isEditing) {
        // UPDATE (PUT)
        await movieApi.put(`/movies/${isEditingId}`, dataToSend);
      } else {
        // CREATE (POST) - chủ động gán id tăng dần để đảm bảo số nguyên liên tục
        const numericIds = (state.movies || [])
          .map(m => (typeof m.id === 'number' ? m.id : parseInt(m.id, 10)))
          .filter(Number.isFinite);
        const nextId = (numericIds.length ? Math.max(...numericIds) : 0) + 1;
        const payload = { ...dataToSend, id: String(nextId) };
        await movieApi.post('/movies', payload);
      }
      
      dispatch({ type: 'RESET_FORM' }); 
      fetchMovies(); 
      return true;
    } catch (error) {
      console.error("Lỗi thao tác CREATE/UPDATE:", error);
      fetchMovies(); // Reload to get current state from server
      return false;
    }
  }, [fetchMovies, state.movies]);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  // Giá trị của Dispatch Context
  const dispatchValue = {
      dispatch, 
      fetchMovies, 
      fetchGenres,
      confirmDelete,
      handleCreateOrUpdate 
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
