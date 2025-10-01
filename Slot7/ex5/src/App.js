import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Header } from './Components/header';
import { Banner } from './Components/banner';
import { Body } from './Components/body';
import { Footer } from './Components/footer';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
