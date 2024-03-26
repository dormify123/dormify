import "./profile.css";
import profileIcon from '../../assets/profile-icon.png';
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
      const {data, status, statusText} = await getUserProfileInformation(user);
      setUserData(data);
    }
    const fetchUserRole = async() => {
      const role = await getUserRole(user);
      setUserRole(role);
    }
    const fetchUserDorm = async() => {
      console.log(user);
      const drm_id = await getUserDorm(user);
      if(drm_id) {
      setUserDorm(drm_id);
      }
    }
    fetchUserProfile();
    fetchUserRole();
    fetchUserDorm();
  },[]);
  console.log(userData);
  return (
    <div className="profile-container">
      <div className="profilecard">
        <img
          src={profileIcon}
          alt="Admin"
          className="user-pic"
        />
        <div className="profile-user-info">
          {userData ? (
            <>
              <div className="profile-box">
                <p className="profile-attribute">Full name:</p>
                <p className="profile-attribute-value">{`${userData[0].first_name} ${userData[0].last_name}`}</p>
              </div>
              <div className="profile-box">
                <p className="profile-attribute">Room number:</p>
                <p className="profile-attribute-value">{userData[0].room_num}</p>
              </div>
              <div className="profile-box">
                <p className="profile-attribute">Email:</p>
                <p className="profile-attribute-value">{userData[0].email}</p>
              </div>
              <div className="profile-box">
                <p className="profile-attribute">Location:</p>
                <p className="profile-attribute-value">AUB, Hamra, Beirut.</p>
              </div>
            </>
          ) : (
            <div>No user information found</div>
          )}
        </div>
        <div className = "dorm-interactions-box">
            <p id="user_role" class="profile-attribute">Current role: {userRole?userRole:<>No user role</>}</p>
            <br></br>
            <p id="user_dorm" class="profile-attribute">Current dorm_id: {userDorm?userDorm:<>Not belonging to any dorm</>}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;