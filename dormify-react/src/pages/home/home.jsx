import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import dormImg from "../../assets/Transparent-pic.png";

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="home-container">
        <div className="hero-content">
          <h1 className="shadowed">Streamlining</h1>
          <h1 className="title-negative-margin">
            <span className="shadowed blue-dark">Dorm Life</span>
          </h1>
          <p className="shadowed grey-text">
            Implementing Solutions for Efficient Dormitory Management
          </p>
          <button className="btn-register" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
        <div className="hero-image">
          <img className="img1" src={dormImg} alt="Dorm" />
        </div>
      </div>
    </>
  );
};

export default Home;
