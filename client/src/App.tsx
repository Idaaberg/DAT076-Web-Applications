import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';


/**
 * The frontend application and its routes
 * @returns App component
 */
function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add" element={<AddBook />} />
      <Route path="/edit/:id" element={<EditBook />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
export default App
