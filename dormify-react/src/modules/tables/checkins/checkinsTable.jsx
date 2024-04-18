import React, { useState, useEffect } from 'react';
import './checkinsTable.css';

const defaultData = [
    {
        name:"placeholder1",
        date:"2024-1-7 11:00"
    },
    {
        name:"placeholder2",
        date:"2023-1-1 12:00"
    }
];

const CheckinsTable = ({ title, checkins_customData }) => {
  const [checkins_tableData, setcheckins_tableData] = useState(defaultData);
  useEffect(() => {
    if (checkins_customData) {
      console.log("custom data updated");
      console.log(checkins_customData);
      setcheckins_tableData(checkins_customData);
    }
  }, [checkins_customData]);
  console.log(checkins_tableData);
  return (
    <div className="checkins-scroll-container">
      <div className="checkins-table-title">
        {title}
      </div>
      <div className="checkins-content">
        {checkins_tableData.map((checkin, index) => (
          <div key={index} className="checkins-entry"><div className="checkins-entry-text">{checkin.name}</div><div className="checkins-entry-text">{checkin.date}</div></div>
        ))}
      </div>
    </div>
  );
};

export default CheckinsTable;
