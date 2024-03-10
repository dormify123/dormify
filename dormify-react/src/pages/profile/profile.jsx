import React from "react";
import "./profile.css";
import profileIcon from '../../assets/profile-icon.png';

const Profile = () => {

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="user-info-container">
            <img
              src={profileIcon}
              alt="Admin"
              className="user-pic"
            />
            <div className="user-info">
              <h4>Dormify User</h4>
              <p className="status">Dorm Resident</p>
              <p className="location">AUB, Beirut, Lebanon</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
