import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ProductForm from './components/ProductForm'
import ProductView from './components/ProductView';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductForm />} />
          <Route path="/products" element={<ProductView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
