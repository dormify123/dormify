import React from "react";
import "./home.css";
import dormImg from '../../assets/Transparent-pic.png';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="hero-content">
          <h1 className="shadowed">Streamlining</h1>
          <h1 style={{ marginTop: "-10px" }}>
            <span className="blue-dark shadowed">Dorm Life</span>
          </h1>
          <p className="shadowed grey-text">
            Implementing Solutions for Efficient Dormitory Management
          </p>
          <a href="#" className="btn shadowed">Register</a>
        </div>
        <div className="hero-image">
          <img className="img1" src={dormImg} alt="Dorm" />
        </div>
      </div>
    </>
  );
};

export default Home;
