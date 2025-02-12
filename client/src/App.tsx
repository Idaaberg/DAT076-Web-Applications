import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import AddBook from './pages/addBook';

function App() {
  
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </Router>
);
}
export default App
