import React, { useState, useEffect } from "react";
import "./services.css";
import BtnMedium from "../../modules/buttons/medium/btn-medium";
import ResidentsTable from '../../modules/tables/residents/residentsTable';
import CheckinsTable from '../../modules/tables/checkins/checkinsTable';
import {
  registerUserRole,
  getUserDorm,
  getUserRole,
  getUserRoomNumber,
  createDorm,
  joinDorm,
  getResidents,
  getCheckins,
  getResident,
  assignRoom,
  kickUser
} from "../../utils/services/users";
import { useNavigate } from "react-router-dom";
const Services = (session_) => {
    let {session} = session_;
    let {user} = session;
    const nav = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [userDorm, setUserDorm] = useState(0);
    const [roomNum, setRoomNum] = useState(-1);
    const [residents, setResidents] = useState(null);
    const [checkins, setCheckins] = useState(null);
    const [selectedResidentId, setSelectedResidentId] = useState(null);
    const [selectedResident, setSelectedResident] = useState(null);
    const[assignRoomButtonDisabled, setAssignRoomButtonDisabled] = useState(true);
    useEffect(() => {
      // Fetch selected resident details when selectedResidentId changes
      const fetchSelectedResident = async () => {
          if (selectedResidentId) {
            console.log("selected resident id within the useEffect: " + selectedResidentId);
              const selectedResidentDetails = await getResident(selectedResidentId);
              console.log(selectedResidentDetails);
              setSelectedResident(selectedResidentDetails);
          }
      };

      fetchSelectedResident();
  }, [selectedResidentId]);
    useEffect(() =>{
        const fetchUserRole = async()=>{
            let role = await getUserRole(session.user);
            setUserRole(role);
            if(!userDorm)
              await fetchUserDorm();
            if(role === "resident")
              fetchUserRommNum();
        }
        const fetchUserDorm = async()=>{
            const dorm_query = await getUserDorm(session.user);
            console.log(dorm_query);
            if(dorm_query)
                setUserDorm(dorm_query.dorm_name);
            if(userRole === "dormowner" && userDorm != 0)
            {
              await fetchResidents(session.user);
              await fetchCheckins(session.user);
            }
        }
        const fetchUserRommNum = async ()=>{
            const room_query = await getUserRoomNumber(user);
            if(room_query.room_num === null)
              setRoomNum(-1);
        }
        const fetchResidents = async ()=>{
          let inner_role = await getUserRole(user);
          console.log(inner_role);
          if(inner_role === "dormowner")
          {
            setResidents(await getResidents(user));
          }
        };
        const fetchCheckins = async () =>{
          let checkins = await getCheckins(user);
          console.log(checkins);
          setCheckins(checkins);
        }

        if(!userRole)
          fetchUserRole();
    },[]);
    async function onRegisterRoleClick(role) {
        console.log(role);
        let message = await registerUserRole(user, role);
        setUserRole(role);
        console.log(message);
        nav('/services');
    }
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
    const dorm_name = document.getElementById("dorm_name").value;
    const error = await joinDorm(user, dorm_name);
    if (!error) {
      nav("/profile");
    } else {
      console.error(error);
    }
  };
  async function handleAssignRoom(){
    let error = await assignRoom(selectedResident,document.getElementById("room_num").value);
    console.log("ROOM CHANGE ERROR HERE: ");
      if(error)
        console.log(error.message);
    setAssignRoomButtonDisabled(true);
  }
  function handleRoomNumChange(e) {
    const { value } = e.target;
    setAssignRoomButtonDisabled(false);
    setSelectedResident(prevState => ({
        ...prevState,
        room_num: value
    }));
}
  async function handleUserKicking(){
    let error = await kickUser(selectedResident);
    if(error)
      console.log(error);
    setSelectedResident(null);
    let updatedResidents = await getResidents(user);
    setResidents(updatedResidents);
  }
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
                  <h className="message-text-small">Enter dorm name to join</h>
                  <input
                    id="dorm_name"
                    type="text"
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
      ) : (userRole === "resident"?<>
              <div className="wrapper">
          <div className="message-box">
          <div className="services-message">
              <h className="message-text-small">
                You are part of dorm {userDorm}, {(roomNum != - 1 || roomNum === null)?<>room number {roomNum}</>:<>You are not assigned a room yet</>}.
              </h>
            </div>
            <div className="services-box">
              <BtnMedium
                withBackground={true}
                withBorder={true}
                onClick={() => nav("/laundry")}
              >
                Laundry 
              </BtnMedium>
              <BtnMedium
                withBackground={true}
                withBorder={true}
                onClick={() => nav("/cleaning")}
              >
                Cleaning 
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
        </div></>:<>
        <div className="wrapper">
        <div className="management-wrapper">
          <div className="table-wrapper">
                <ResidentsTable title = {"Residents"} custom_data = {residents} handleButtonClick={setSelectedResidentId}></ResidentsTable>
          </div>
          <div className="table-wrapper">
                <CheckinsTable title = {"Check-ins"} checkins_customData = {checkins} ></CheckinsTable>
          </div>
        </div>
        <div className="user-management-wrapper">
        {selectedResident?<>
                <div className="user-management-container">
                  <div className="user-management-entry">
                    <input onChange = {handleRoomNumChange} id="room_num" type = "number" value ={selectedResident.room_num}></input>
                  </div>
                  <div className="user-management-entry">
                    <BtnMedium withBackground={true} withBorder={true} backgroundColor = {"red"} onClick={handleUserKicking}>Kick</BtnMedium>
                    <BtnMedium withBackground={true} withBorder={true} onClick={handleAssignRoom} disabled={assignRoomButtonDisabled}>Assign Room</BtnMedium>
                  </div>
        </div></>:
        <></>}
        </div>
        </div>
        </>)}
    </>);
}
export default Services;
