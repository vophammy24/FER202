import MovieManager from './pages/MovieManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';


const AppContent = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <Header />
      {isAuthenticated ? <MovieManager /> : <LoginPage />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
