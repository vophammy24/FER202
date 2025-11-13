import { AuthProvider} from './contexts/AuthContext';
import { ExpensesProvider } from './contexts/ExpensesContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
        <ExpensesProvider>
            <AppRoutes />
        </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
