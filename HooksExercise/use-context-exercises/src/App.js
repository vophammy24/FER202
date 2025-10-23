import CounterComponent from "./components/Counter";
import SwitchLight from "./components/SwitchLight";
import { ThemeProvider } from "./contexts/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
        <CounterComponent />
        <SwitchLight />
      </div>
    </ThemeProvider>

  );
}

export default App;
