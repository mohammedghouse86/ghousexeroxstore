import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RequestContext from "../Context/request_contex/requestContext";


const Navbar = () => {
  let json_1;
  const context = useContext(RequestContext);
  const { username, setUsername, alert, setAlert } = context;
  const path = (localStorage.getItem('token')?'/':'/login')
  const path_1 = (localStorage.getItem('token')?'/PdfToBase64':'/login')
  let history = useNavigate();
  let location = useLocation();
  useEffect(() => {
    fetchData();
    async function fetchData() {
    const response = await fetch("http://localhost:7000/auth/getuser", {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      json_1 = await response.json();
      setUsername(json_1.name)}
  }, [location]);

  const fun_Logout = () => {
    localStorage.clear();
    history("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">GHOUSE XEROX STORE</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active p-1 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" : ""}`} aria-current="page" to={path}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/About" ? "active p-1 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" : ""}`} to="/About">About</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/PdfToBase64" ? "active p-1 text-primary-emphasis bg-light-subtle border border-primary-subtle rounded-3" : "navbar-nav me-auto mb-2 mb-lg-0"}`} aria-current="page" to={path_1}>UpLoad a Request</Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ?<div className='d-flex flex-row-reverse'><div className="p-2">
             <Link className={`nav-link ${location.pathname === "/login" ? "active p-1 text-primary-emphasis bg-light-subtle border border-primary-subtle rounded-3" : "navbar-nav me-auto mb-2 mb-lg-0"}`} aria-current="page" to="/login">LogIn</Link>
          </div>
          <div className="p-2">
            <Link className={`nav-link ${location.pathname === "/signup" ? "active p-1 text-primary-emphasis bg-light-subtle border border-primary-subtle rounded-3" : "navbar-nav me-auto mb-2 mb-lg-0"}`} aria-current="page" to="/signup">SignUp</Link> 
          </div></div>:<div><button type='button' className="btn btn-outline-warning mx-3 disabled">{username}</button><button type='button' className="btn btn-danger mx-3" onClick={fun_Logout}> LOG OUT</button></div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
