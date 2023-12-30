import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
