import "./profile.css";
import profileIcon from '../../assets/profile-icon.png';
import { getUserInformation } from "../../utils/services/users";
import {useState, useEffect} from 'react';

const Profile = (session_) => {
  const {session} = session_;
  const {user} = session;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async() => {
      const {data, status, statusText} = await getUserInformation(user);
      setUserData(data);
    }
    fetchData();
  },[]);
  console.log(userData);
  return (
    <>
      <div className="container">
        <div className="card">
          <div>
            <img
              src={profileIcon}
              alt="Admin"
              className="user-pic"
            />
            <div className="user-info">
            {userData?
            <>
            <div className="box">
              <p className="profile-attribute">Full name: </p>
              <p className="profile-attribute-value"> {userData[0].first_name + " " + userData[0].last_name}</p>
            </div>
            <div className="box">
              <p className="profile-attribute">Room number: </p>
              <p className="profile-attribute-value"> {userData[0].room_num}</p>
            </div>
            <div className="box">
              <p className="profile-attribute">Email: </p>
              <p className="profile-attribute-value"> {userData[0].email}</p>
            </div>
            <div className="box">
              <p className="profile-attribute">Location: </p>
              <p className="profile-attribute-value">AUB, hamra, beirut.</p>
            </div>
            </>:
            <>
            <div>No user information found</div>
            </>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;