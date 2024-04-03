import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import BtnMedium from "../../modules/buttons/medium/btn-medium.jsx";
import dormImg from "../../assets/Transparent-pic.png";
import laundryLogo from "../../assets/Laundry-pic.png";
import cleaningLogo from "../../assets/Cleaning-pic.png";
import keyLogo from "../../assets/Key-pic.png";

const Home = (session_) => {
  const { session } = session_;
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("signup");
  };
  function onGetStartedClick(e) {
    navigate("services");
  }
  function onLaundryClick(e) {
    navigate("laundry");
  }
  function onCleaningClick(e) {
    navigate("cleaning");
  }
  function onCheckInClick(e) {
    navigate("checkIn");
  }

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
          {!session ? (
            <>
              <button className="btn-register" onClick={handleRegisterClick}>
                Register
              </button>
            </>
          ) : (
            <BtnMedium
              withBackground={true}
              withBorder={true}
              onClick={onGetStartedClick}
            >
              Get Started
            </BtnMedium>
          )}
        </div>
        <div className="hero-image">
          <img className="img1" src={dormImg} alt="Dorm" />
        </div>
      </div>
      <section className="additional-options">
        <h2>Maximize dorm life, Minimize the hassle</h2>
        <div className="photo-buttons">
          <div className="photo-button1">
            <button onClick={onLaundryClick} className="serviceButton">
              <img className="serviceImage" src={laundryLogo} alt="Laundry" />
            </button>
            <p className="serviceDetails">
              Reserve up to 2 slots per week here
            </p>
          </div>

          <div className="photo-button2">
            <button onClick={onCleaningClick} className="serviceButton">
              <img className="serviceImage" src={cleaningLogo} alt="Button 2" />
            </button>
            <p className="serviceDetails">
              Reserve cleaning service for you room
            </p>
          </div>

          <div className="photo-button3">
            <button onClick={onCheckInClick} className="serviceButton">
              <img className="serviceImage" src={keyLogo} alt="Button 3" />
            </button>
            <p className="serviceDetails">Arrived late? Check-in here</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
