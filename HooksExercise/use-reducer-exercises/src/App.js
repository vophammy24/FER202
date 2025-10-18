import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/Counter';
import SwitchLight from './components/SwitchLight';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div>
      <CounterComponent />
      <SwitchLight />
      <QuestionBank />
      <LoginForm />
      <SignUpForm />
    </div>
  );
}

export default App;
