import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import NavBar from './components/Navigation';

function App() {
  return (
    <>
    <NavBar />
    <div  className = "App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lien-he" element={<About />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/san-pham/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
