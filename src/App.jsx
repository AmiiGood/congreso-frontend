import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Participantes from './pages/Participantes';
import Registro from './pages/Registro';
import Gafete from './pages/Gafete';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participantes" element={<Participantes />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/gafete/:id" element={<Gafete />} />
      </Routes>
    </Router>
  );
}

export default App;

