import "./profile.css";
import profileIcon from '../../assets/profile-icon.png';
import BtnMedium from '../../modules/buttons/medium/btn-medium'
import { getUserProfileInformation, getUserRole, getUserDorm } from "../../utils/services/users";
import {useState, useEffect} from 'react';

const Profile = (session_) => {
  const {session} = session_;
  const {user} = session;
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userDorm, setUserDorm] = useState(null);
  let dorm;
  useEffect(() => {
    const fetchUserProfile = async() => {
      const data = await getUserProfileInformation(user);
      console.log("data is: " + data);
      setUserData(data);
    }
    const fetchUserRole = async() => {
      const role = await getUserRole(user);
      setUserRole(role);
    }
    const fetchUserDorm = async() => {
      console.log(user);
      const drm = await getUserDorm(user);
      if(drm) {
      setUserDorm(drm);
      }
    }
    fetchUserProfile();
    fetchUserRole();
    fetchUserDorm();
  },[]);
  async function uploadProfilePicture(picture){

  }
  function handleFullNameChange(e) {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      full_name: value
    }
    ));
  }
  function handleRoomNumberChange(e) {
    const { name, value } = e.target; 
    setUserData(prevState => ({
      ...prevState,
      room_number: value
    }
    ));
  };
  function handleEmailChange(e) {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      email: value
    }
    ));
  }

  function handleLocationChange(e){
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      location: value
    }
    ));
  }
  
  return (
    <div className="profile-container">
      <div className="profilecard">
        <div className="profile-pic">
          <img
            src={profileIcon}
            alt="Admin"
            className="user-pic"
          />
          <BtnMedium withBackground={true} withBorder={true} textColor = {"white"} onClick={() => uploadProfilePicture()}>
            Upload picture
          </BtnMedium>
        </div>
        <div className="profile-user-info">
          {userData ? (
            <>
              <div className="profile-box">
                <p className="profile-attribute">Full name:</p>
                <input onChange={handleFullNameChange} className="profile-input" value = {userData.full_name} ></input>
              </div>
              <div className="profile-box">
                <p className="profile-attribute">Room number:</p>
                <input onChange={handleRoomNumberChange} className="profile-input" value = {userData.room_num}></input>
              </div>
              <div className="profile-box">
                <p className="profile-attribute">Email:</p>
                <input onChange={handleEmailChange} className="profile-input" value = {userData.email}></input>
              </div>
              <div className="profile-box">
                <p className="profile-attribute">Location:</p>
                {userDorm?<>
                    <input className="profile-input" onChange={handleLocationChange} value = {userDorm.location}></input>
                </>:<>
                  <input className="profile-input" onChange={handleLocationChange} value = {userData.location}></input>
                </>}
              </div>
            </>
          ) : (
            <div>No user information found</div>
          )}
        </div>
        <div className = "dorm-box">
          <div className="dorm-information-box">
            <p id="user_role" class="dorm-information-text">Current role: {userRole?userRole:<>No user role</>}</p>
            <p id="user_dorm" class="dorm-information-text">Current dorm_id: {userDorm?userDorm.id:<>Not belonging to any dorm</>}</p>
          </div>
            <div className="dorm-interactions-box">{userDorm?<>
              <BtnMedium withBorder={true} withBackground={true} backgroundColor={"red"}>Leave Dorm</BtnMedium>
            </>:<>
            <BtnMedium withBorder={true} withBackground={true}>Join a Dorm</BtnMedium>
            </>}
            <BtnMedium withBorder={true} withBackground={true} backgroundColor={"lightgray"} hoverDisabled={true}>Save Changes</BtnMedium>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;