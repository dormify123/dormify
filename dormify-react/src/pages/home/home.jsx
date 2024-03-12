import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import dormImg from "../../assets/Transparent-pic.png";
import laundryLogo from "../../assets/Laundry-pic.png";
import cleaningLogo from "../../assets/Cleaning-pic.png";
import keyLogo from "../../assets/Key-pic.png";

const Home = (session_) => {
  const {session} = session_;
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
          {!session?(
          <>
            <button className="btn-register" onClick={handleRegisterClick}>
            Register
            </button>
          </>):<p></p>
          }
        </div>
        <div className="hero-image">
          <img className="img1" src={dormImg} alt="Dorm" />
        </div>
      </div>
      <section className="additional-options">
        <h2>Maximize dorm life, Minimize the hassle</h2>
        <div className="photo-buttons">
          <div className="photo-button1">
            <img
              className="serviceImage"
              src={laundryLogo}
              alt="Button 1"
            />

            <p className="serviceDetails">Reserve up to 2 slots per week here</p>
          </div>

          <div className="photo-button2">
            <img className="serviceImage" src={cleaningLogo} alt="Button 2" />

            <p className="serviceDetails">Reserve cleaning service for you room</p>
          </div>

          <div className="photo-button3">
            <img className="serviceImage" src={keyLogo} alt="Button 3" />

            <p className="serviceDetails">Arrived late? Check-in here</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
