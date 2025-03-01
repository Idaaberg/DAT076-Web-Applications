import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
}
export default App
