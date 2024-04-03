import React, { useState } from "react";
import "./checkIn.css";
import { useUser } from './UserContext';

const CheckIn = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const { user } = useUser();

  const handleCheckIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
  };

  return (
    <div className="check-in-container">
      <h1>Arrived Late? Check-in Here</h1>
      <button className="check-in-button" onClick={handleCheckIn}>
        Check In
      </button>
      {checkInTime && (
        <div className="user-info-box">
          <p>User: {user ? user.name : 'Angela Sobhieh'}</p>
          <p>Check-in Time: {checkInTime}</p>
        </div>
      )}
    </div>
  );
};

export default CheckIn;
