import { AuthProvider} from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { UserProvider } from './contexts/UserContext';
import AppRoutes from './routes/AppRoute';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PaymentProvider>
          <AppRoutes />
        </PaymentProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
