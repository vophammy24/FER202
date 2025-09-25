import logo from './logo.svg';
import './App.css';
import { Exercise1 } from './Components/exercise1';
import { Exercise2 } from './Components/exercise2';
import { Exercise3 } from './Components/exercise3';
import { Exercise4 } from './Components/exercise4';
import { Exercise5 } from './Components/exercise5';
import { Exercise6 } from './Components/exercise6';
import { Exercise7 } from './Components/exercise7';
import { Exercise8 } from './Components/exercise8';

function App() {
  return (
    <div>
      <h4>Exercise 1:</h4>
      <Exercise1 />
      <hr />
      <h4>Exercise 2:</h4>
      <Exercise2 />
      <hr />
      <h4>Exercise 3:</h4>
      <Exercise3 />
      <hr />
      <h4>Exercise 4:</h4>
      <Exercise4 />
      <hr />
      <h4>Exercise 5:</h4>
      <Exercise5 />
      <hr />
      <h4>Exercise 6:</h4>
      <Exercise6 />
      <hr />
      <h4>Exercise 7:</h4>
      <Exercise7 />
      <hr />
      <h4>Exercise 8:</h4>
      <Exercise8 />
      <hr />
    </div>
  );
}

export default App;
