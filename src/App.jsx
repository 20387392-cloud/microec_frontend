import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Agregaremos más rutas más adelante */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;