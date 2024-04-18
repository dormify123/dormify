import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import BtnSmall from "../buttons/small/btn-small";
import Modal from "../modals/modals.jsx";
import { userSignOut } from "../../utils/services/auth";

const Header_ = ({ session }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);

  function onSignupClick(event) {
    event.preventDefault();
    navigate("signup");
  }

  function onLoginClick(event) {
    event.preventDefault();
    navigate("login");
  }

  function onHomeClick(event) {
    event.preventDefault();
    navigate("/");
  }

  function onServicesClick(event) {
    event.preventDefault();
    if (session) {
      navigate("services");
    } else {
      setModalOpen(true);
    }
  }

  async function onSignoutClick(event) {
    event.preventDefault();
    let error = await userSignOut();
    if (error) {
      alert(error.message);
    }
    navigate("/");
  }

  async function onProfileClick(event) {
    event.preventDefault();
    navigate("/profile");
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        message="Please log in to access the services."
        onClose={handleModalClose}
      />
      <div className="header-container-row">
        <div className="box-invisible" style={{ width: "40px" }}></div>
        <div className="box logo" onClick={onHomeClick}></div>
        <div className="box-invisible" style={{ width: "690px" }}></div>
        <BtnSmall className="box" textColor={"black"} onClick={onHomeClick}>
          Home
        </BtnSmall>
        <BtnSmall className="box" textColor={"black"} onClick={onServicesClick}>
          Services
        </BtnSmall>
        <div className="box-invisible" style={{ width: "20px" }}></div>
        {session ? (
          <>
            <BtnSmall className="box" textColor="red" onClick={onSignoutClick}>
              Sign out
            </BtnSmall>
            <div className="box-invisible" style={{ width: "20px" }}></div>
            <div className="user-info-container">
              <button className="user-pic-button" onClick={onProfileClick}>
                <img
                  src={require("../../assets/profile-icon.png")}
                  alt="Admin"
                  className="user-pic-header"
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <BtnSmall
              className="box"
              withBackground={false}
              withBorder={false}
              onClick={onLoginClick}
            >
              Login
            </BtnSmall>
            <BtnSmall
              className="box"
              withBackground={true}
              withBorder={true}
              onClick={onSignupClick}
            >
              Register
            </BtnSmall>
          </>
        )}
      </div>
    </>
  );
};

export default Header_;
