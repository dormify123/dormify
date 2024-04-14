import React, { useState, useEffect } from "react";
import "./services.css";
import BtnMedium from "../../modules/buttons/medium/btn-medium";
import {
  registerUserRole,
  getUserDorm,
  getUserRole,
  getUserRoomNumber,
  createDorm,
  joinDorm,
} from "../../utils/services/users";
import { useNavigate } from "react-router-dom";

const Services = ({ session }) => {
  const { user } = session;
  const nav = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [userDorm, setUserDorm] = useState(null);
  const [roomNum, setRoomNum] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      console.error("User data is incomplete or unavailable.");
      return;
    }
    const fetchData = async () => {
      const role = await getUserRole(user);
      const dormId = await getUserDorm(user);
      const roomNumber = await getUserRoomNumber(user.id);
      setUserRole(role);
      setUserDorm(dormId);
      setRoomNum(roomNumber);
    };
    fetchData();
  }, [user]);

  const onRegisterRoleClick = async (role) => {
    const message = await registerUserRole(user, role);
    if (!message.error) {
      setUserRole(role);
      nav("/services");
    } else {
      console.error(message.error);
    }
  };

  const onCreateDormClick = async () => {
    const dorm_name = document.getElementById("dorm_name").value;
    const dorm_email = document.getElementById("dorm_email").value;
    const dorm_location = document.getElementById("dorm_location").value;
    const dorm_rooms = document.getElementById("dorm_room_num").value;
    const error = await createDorm(
      dorm_name,
      dorm_email,
      dorm_location,
      dorm_rooms,
      user
    );
    if (!error) {
      nav("/profile");
    } else {
      document.getElementById("error").textContent = error.message;
    }
  };

  const onJoinDormClick = async () => {
    const dorm_id = document.getElementById("dorm_id").value;
    const error = await joinDorm(user, dorm_id);
    if (!error) {
      nav("/profile");
    } else {
      console.error(error);
    }
  };

  return (
    <>
      <div className="message-top">
        {userRole === "dormowner" && userDorm && (
          <h className="message-text-large">Manage your dorm here</h>
        )}
        {userRole !== "dormowner" && (
          <h className="message-text-large">Register for services</h>
        )}
      </div>
      {!userRole ? (
        <div className="wrapper">
          <div className="message-box">
            <div className="services-message">
              <h className="message-text-large">
                Looks like you haven't selected a role
              </h>
              <h className="message-text-small">Let's get you started</h>
            </div>
            <div className="services-box">
              <div className="services-message box">
                <h className="message-text-small">I am a:</h>
              </div>
              <BtnMedium
                className="services-row-box"
                withBackground={true}
                withBorder={true}
                onClick={() => onRegisterRoleClick("resident")}
              >
                Resident
              </BtnMedium>
              <BtnMedium
                className="services-row-box"
                withBackground={true}
                withBorder={true}
                onClick={() => onRegisterRoleClick("dormowner")}
              >
                Dorm Owner
              </BtnMedium>
            </div>
          </div>
        </div>
      ) : !userDorm ? (
        <div className="wrapper">
          <div className="message-box">
            <div className="services-message">
              <h className="message-text-large">
                Looks like you don't belong to a dorm
              </h>
              <h className="message-text-small">
                {userRole === "dormowner"
                  ? "Create a dorm here"
                  : "Join a dorm below:"}
              </h>
            </div>
            <div className="services-box">
              {userRole === "dormowner" ? (
                <form className="dorm-creation-form">
                  <div className="form-creation-box">
                    <input
                      id="dorm_name"
                      className="dorm-creation-input"
                      type="text"
                      placeholder="Enter dorm name"
                    />
                    <input
                      id="dorm_email"
                      className="dorm-creation-input"
                      type="text"
                      placeholder="Enter dorm email"
                    />
                  </div>
                  <div className="form-creation-box">
                    <input
                      id="dorm_location"
                      className="dorm-creation-input"
                      type="text"
                      placeholder="Enter location"
                    />
                    <input
                      id="dorm_room_num"
                      className="dorm-creation-input"
                      type="number"
                      placeholder="Enter number of rooms"
                    />
                  </div>
                  <BtnMedium
                    withBackground={true}
                    withBorder={true}
                    onClick={onCreateDormClick}
                  >
                    Submit
                  </BtnMedium>
                  <p id="error"></p>
                </form>
              ) : (
                <>
                  <h className="message-text-small">Enter dorm ID to join</h>
                  <input
                    id="dorm_id"
                    type="number"
                    className="dorm-creation-input"
                    style={{ maxWidth: "50px" }}
                  />
                  <BtnMedium
                    onClick={onJoinDormClick}
                    withBackground={true}
                    withBorder={true}
                  >
                    Enter Dorm
                  </BtnMedium>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="message-box">
            <div className="services-message">
              <h className="message-text-large">
                You are registered as a {userRole}
              </h>
              <h className="message-text-small">
                You are part of dorm {userDorm}, room {roomNum}.
              </h>
            </div>
            <div className="services-box">
              <BtnMedium
                withBackground={true}
                withBorder={true}
                onClick={() => nav("/laundry")}
              >
                Laundry Schedule
              </BtnMedium>
              <BtnMedium
                withBackground={true}
                withBorder={true}
                onClick={() => nav("/cleaning")}
              >
                Cleaning Schedule
              </BtnMedium>
              <BtnMedium
                withBackground={true}
                withBorder={true}
                onClick={() => nav("/checkIn")}
              >
                Check In
              </BtnMedium>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
