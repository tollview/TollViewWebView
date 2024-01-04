import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import { UserProvider } from './contexts/UserContext';
import {FirebaseProvider} from "./contexts/FirebaseContext.tsx";

function App() {
  return (
    <Router>
      <UserProvider>
          <FirebaseProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </FirebaseProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
