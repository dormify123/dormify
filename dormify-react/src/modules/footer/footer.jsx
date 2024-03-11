import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-body">
        <header class="header">
          <div class="logo">{/* Dorm<i>i</i>fy */}</div>
        </header>
        <nav>
          <ul class="nav-links">
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Footer;
