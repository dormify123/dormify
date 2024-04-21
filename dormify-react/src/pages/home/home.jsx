import React, { useEffect, useState } from "react";
import {getUserRole, getUserDorm} from '../../utils/services/users.jsx'
import { useNavigate } from "react-router-dom";
import "./home.css";
import BtnMedium from "../../modules/buttons/medium/btn-medium.jsx";
import dormImg from "../../assets/Transparent-pic.png";
import laundryLogo from "../../assets/Laundry-pic.png";
import cleaningLogo from "../../assets/Cleaning-pic.png";
import keyLogo from "../../assets/Key-pic.png";
import Modal from "../../modules/modals/modals.jsx";

const Home = (session_ ) => {
  let {session} = session_;
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
    const fetchUserRole = async ()=>{
      if(session)
      {
        let {user} = session;
        let userRole_query = await getUserRole(user);
        return userRole_query;
      }
    }
    const fetchUserDorm = async ()=>{
      if(session)
      {
        let {user} = session;
        let userDormQuery = await getUserDorm(user);
        let userDorm;
        if(userDormQuery)
          userDorm = userDormQuery.dorm_name;
        return userDorm;
      }
    }

  const handleModalClose = () => setModalOpen(false);

  const handleServiceAccess = async (route) => {
    let userRole = await fetchUserRole();
    let userDorm = await fetchUserDorm();
    console.log(userRole);
    if (session && (userRole === "resident" || userRole === "dormowner")) {
      if(userDorm)
        navigate(route);
      else
        navigate("services");
    } else if (!session) {
      setModalOpen(true);
    }
    else {
      navigate('services');
    }
  };

  const handleRegisterClick = () => {
    navigate("signup");
  };

  function onGetStartedClick(e) {
    navigate("\services");
  }

  function onLaundryClick(e) {
      handleServiceAccess("laundry");
  }

  function onCleaningClick(e) {
      handleServiceAccess("cleaning");
  }

  function onCheckInClick(e) {
      handleServiceAccess("checkIn");
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        message="Please log in to access the services."
        onClose={handleModalClose}
      />
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
            <button className="btn-register" onClick={handleRegisterClick}>
              Register
            </button>
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
          <button onClick={onLaundryClick} className="serviceButton">
            <img className="serviceImage" src={laundryLogo} alt="Laundry" />
            <p className="serviceDetails">
              Reserve up to 2 slots per week here
            </p>
          </button>

          <button onClick={onCleaningClick} className="serviceButton">
            <img className="serviceImage" src={cleaningLogo} alt="Cleaning" />
            <p className="serviceDetails">
              Reserve cleaning service for your room
            </p>
          </button>

          <button onClick={onCheckInClick} className="serviceButton">
            <img className="serviceImage" src={keyLogo} alt="Check-in" />
            <p className="serviceDetails">Arrived late? Check-in here</p>
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
