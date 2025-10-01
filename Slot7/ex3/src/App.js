import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Banner } from './Components/Banner';
import Navbar from './Components/Navbar';
import { Grid } from './Components/Grid';
import { Footer } from './Components/Footer';


function App() {
  return (
    <div>
    <Banner />
    <Navbar />
    <Grid />
    <Footer />
    </div>
  );
}

export default App;
