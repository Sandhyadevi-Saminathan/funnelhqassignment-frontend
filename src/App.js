import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Register from './Components/Register';
import Home from './Components/Home';

function App() {
  return (
  <BrowserRouter>
  <Routes>         
    <Route path='/' element={<LoginPage/>}/>
    <Route path="/users/register" element={<Register />} />
    <Route path="/users/home" element={<Home />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
