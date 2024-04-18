import React from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  function onLogoClick(event) {
    event.preventDefault();
    navigate("/");
  }

  function onAboutClick(event) {
    event.preventDefault();
    navigate("/about");
  }

  function onContactClick(event) {
    event.preventDefault();
    navigate("/contact");
  }

  return (
    <footer className="footer-body">
      <header className="header">
        <div className="logo" onClick={onLogoClick}></div>
        <div className="copyright">
          © {new Date().getFullYear()} Dormify. All rights reserved.
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="/contact" onClick={onContactClick}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="/about" onClick={onAboutClick}>
                About Us
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </footer>
  );
};

export default Footer;
