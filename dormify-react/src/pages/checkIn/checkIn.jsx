import React, { useState, useEffect } from "react";
import {checkinLateUser, getUserProfileInformation} from '../../utils/services/users';
import "./checkIn.css";
import { useUser } from './UserContext';

const CheckIn = (session_) => {
  const [checkInTime, setCheckInTime] = useState('');
  const [userName, setUserName] = useState("no user logged in");
  const {session} = session_;
  const {user} = session;
  useEffect(()=>{
    const fetchUserName = async() =>{
      let user_profile = await getUserProfileInformation(user);
      setUserName(user_profile.full_name);
    }
    fetchUserName();
  });
  const handleCheckIn = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setCheckInTime(currentTime);
    checkinLateUser(user,date);
  };

  return (
    <div className="check-in-container">
      <h1>Arrived Late? Check-in Here</h1>
      <button className="check-in-button" onClick={handleCheckIn}>
        Check In
      </button>
      {checkInTime && (
        <div className="user-info-box">
          <p>User: {userName}</p>
          <p>Check-in Time: {checkInTime}</p>
        </div>
      )}
    </div>
  );
};

export default CheckIn;
