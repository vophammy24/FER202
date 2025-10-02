import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Header } from './Components/header';
import { Banner } from './Components/banner';
import { Body } from './Components/body';
import { Form } from './Components/form';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Body />
      <Form />
    </div>
  );
}

export default App;
