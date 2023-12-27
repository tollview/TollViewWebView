import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.tsx'
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
