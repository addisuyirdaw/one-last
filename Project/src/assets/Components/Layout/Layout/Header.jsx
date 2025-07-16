import React, { useEffect, useState } from "react";
import "../../../../App.css"; // Make sure to create this CSS file

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
          <a href="">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="logo-section">
        <img src="/public/images/logo.png" alt="DBU Student Union Logo" />
      </div>
      <nav className={`navbar ${isFixed ? "fixed" : ""}`}>
        <div className="navbar-header">
          <button
            className="menu-toggle"
            onClick={() => {
              const navLinks = document.querySelector(".nav-links");
              navLinks.classList.toggle("active");
            }}
          >
            ☰
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">
              Clubs <span className="dropdown-icon">▼</span>
            </a>
            <ul className="dropdown">
              <li>
                <a href="#">Tech</a>
              </li>
              <li>
                <a href="#">Drama</a>
              </li>
              <li>
                <a href="#">Art</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Elections</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">
              Latest <span className="dropdown-icon">▼</span>
            </a>
            <ul className="dropdown">
              <li>
                <a href="#">Event</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Announcement</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="login">
          <a href="#">Register</a>
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
