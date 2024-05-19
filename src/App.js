import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import './App.css'; // Importing CSS styles
import Signup from './Components/signup';
import Home from './Components/home';
import Login from './Components/login';
import RequestState from './Context/request_contex/requestState';
import PdfToBase64Converter from './Components/base64string';


function App() {
  return (
    <>
      <RequestState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/PdfToBase64" element={<PdfToBase64Converter />} />
          </Routes>
        </Router>
      </RequestState>

    </>
  );
}

export default App;
