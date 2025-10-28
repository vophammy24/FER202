import './App.css';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import Settings from './components/Settings';
import Reports from './components/Reports';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
