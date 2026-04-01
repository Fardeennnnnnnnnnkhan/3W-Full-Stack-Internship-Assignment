import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import CreatePost from './Components/CreatePost';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Components/Navbar';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app-wrapper">
      {!hideNavbar && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {  
  return (
   <Router>
      <AppContent />
   </Router>
  )
}

export default App;
