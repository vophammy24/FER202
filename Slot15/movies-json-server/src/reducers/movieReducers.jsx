export const initialMovieState = {
  movies: [],
  genres: [],
  loading: false, 
  isEditing: null, 
  currentMovie: { poster: '', title: '', description: '', genreId: '', year: '', country: '', duration: '' },
  showEditModal: false,   
  showDeleteModal: false, 
  movieToDelete: null,    
  filters: { search: '', genreId: '', durationMin: '', country: '', sort: '' }
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false };

    case 'SET_GENRES':
      return { ...state, genres: action.payload, loading: false };
      
    case 'START_LOADING':
      return { ...state, loading: true };
      
    case 'UPDATE_FIELD':
      return { 
          ...state, 
          currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value }
      };

    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialMovieState.filters
      };

    case 'OPEN_EDIT_MODAL':
      // Gán dữ liệu phim vào currentMovie để điền vào form sửa
      return { 
        ...state, 
        currentMovie: action.payload, 
        isEditing: action.payload.id,
        showEditModal: true 
      };
      
    case 'CLOSE_EDIT_MODAL':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false 
      };

    case 'OPEN_DELETE_MODAL':
        return {
            ...state,
            movieToDelete: action.payload,
            showDeleteModal: true 
        };

    case 'CLOSE_DELETE_MODAL':
        return {
            ...state,
            movieToDelete: null,
            showDeleteModal: false 
        };
      
    case 'RESET_FORM':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie, 
        isEditing: null,
        showEditModal: false,
      };

    default:
      return state;
  }
};
