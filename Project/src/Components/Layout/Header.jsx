import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../../App.css";

function Header() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      const sticky = navbar.offsetTop;

      if (window.pageYOffset > sticky) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="add-info">
        <div className="add-info-loc col-lg-9 col-md-9 hide">
          <ul className="row">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>DBU inside left to cafe road</span>
            </li>
            <li>
              <i className="fa fa-envelope"></i>
              <span>studentunion@dbu.edu.et</span>
            </li>
            <li>
              <i className="fa fa-phone"></i>
              <span>+251940414243</span>
            </li>
          </ul>
        </div>
        <div className="add-info-soc col-lg-2 col-md-3 col-sm-12">
          <a href="#">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="logo-section">
        <img src="/images/logo.png" alt="DBU Student Union Logo" />
      </div>
      <nav className={`navbar ${isFixed ? "fixed" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="#">
              Clubs <span className="dropdown-icon">▼</span>
            </Link>
            <ul className="dropdown">
              <li>
                <Link to="#">Tech</Link>
              </li>
              <li>
                <Link to="#">Drama</Link>
              </li>
              <li>
                <Link to="#">Art</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">Elections</Link>
          </li>
          <li>
            <Link to="#">Services</Link>
          </li>
          <li>
            <Link to="#">
              Latest <span className="dropdown-icon">▼</span>
            </Link>
            <ul className="dropdown">
              <li>
                <Link to="#">Event</Link>
              </li>
              <li>
                <Link to="#">News</Link>
              </li>
              <li>
                <Link to="#">Announcement</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="login">
          <Link to="/register">Register</Link>
          <button>Login</button>
        </div>
      </nav>
    </header>
  );
}

const App = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default App;
