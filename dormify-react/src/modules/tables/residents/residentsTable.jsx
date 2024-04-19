import React, { useState, useEffect } from 'react';
import './residentsTable.css';

const defaultData = [
    {
        users:{
            id: "1234",
            full_name:"no users in dorm"
        }
    }
];

const ResidentsTable = ({title, custom_data, handleButtonClick}) => {
  const [residentsTableData, setresidentsTableData] = useState(defaultData);
  if(!custom_data)
    handleButtonClick =() => {};
  useEffect(() => {
    if (custom_data) {
      console.log("custom data updated");
      console.log(custom_data);
      setresidentsTableData(custom_data);
    }
  }, [custom_data]);
  return (
    <div className="scroll-container">
      <div className="table-title">
        {title}
      </div>
      <div className="content">
        {residentsTableData.map((resident, index) => (
          <div key={index} className="entry" onClick={() => {handleButtonClick(resident.users.id)}} id = {resident.users.id} ><div className="entry-text">{resident.users.full_name}</div></div>
        ))}
      </div>
    </div>
  );
};

export default ResidentsTable;
