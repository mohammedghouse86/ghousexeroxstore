import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Components/navbar';
import './App.css'; // Importing CSS styles
import Signup from './Components/signup';
import Home from './Components/home';



function App() {
  return (
    <>

        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>

    </>
  );
}

export default App;
