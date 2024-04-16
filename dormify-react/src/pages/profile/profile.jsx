import "./profile.css";
import profileIcon from '../../assets/profile-icon.png';
import BtnMedium from '../../modules/buttons/medium/btn-medium'
import { getUserProfileInformation, getUserRole, getUserDorm, changeUserInformation, getUserProfilePicture, leaveDorm, getResidents} from "../../utils/services/users";
import {useState, useEffect} from 'react';
import { useFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from 'use-file-picker/validators';
import {Buffer} from 'buffer';

const Profile = (session_) => {
  const {session} = session_;
  const {user} = session;
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userDorm, setUserDorm] = useState(null);
  const [disabled, setSaveDisabled] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(['jpg', 'png', 'jpeg']),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 })
    ],
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      document.getElementById('user-profile-pic').src = filesContent[0].content;
      setSaveDisabled(false);
    },
  });



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
      if(drm != null) {
      setUserDorm(drm);
      }
    }
    const fetchUserProfilePicture  = async () =>{
      const picture = await getUserProfilePicture(user);
      if(picture)
      {
        const binaryImageData = picture.replace(/\\x/g, '');
        const imageData = Buffer.from(binaryImageData, 'hex').toString("base64");
        console.log(imageData);
        setProfilePicture(imageData);
      }
    }
    fetchUserProfile();
    fetchUserRole();
    fetchUserDorm();
    fetchUserProfilePicture();
  },[]);
  async function saveUserChanges(){
    let errors = await changeUserInformation(user, userData.full_name, userData.email, (userDorm?userDorm.location:userData.location), document.getElementById('user-profile-pic').src);
    setSaveDisabled(true);
    console.log(errors);
  }
  async function uploadProfilePicture(){
    openFilePicker();
  }
  async function handleLeaveDorm(){
    await leaveDorm(user);
    setUserDorm(null);
  }
  function handleFullNameChange(e) {
    const { name, value } = e.target;
    setSaveDisabled(false);
    setUserData(prevState => ({
      ...prevState,
      full_name: value
    }
    ));
  }
  function handleEmailChange(e) {
    const { name, value } = e.target;
    setSaveDisabled(false);
    setUserData(prevState => ({
      ...prevState,
      email: value
    }
    ));
  }

  function handleLocationChange(e){
    const { name, value } = e.target;
    setSaveDisabled(false);
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
          {profilePicture?<>
            <img
            src={`data:image/png;base64,${profilePicture}`}
            alt="Admin"
            className="user-pic"
            id="user-profile-pic"
          />
          </>:<>
          <img
            src={profileIcon}
            alt="Admin"
            className="user-pic"
            id="user-profile-pic"
          />
          </>}

          <BtnMedium withBackground={true} withBorder={true} textColor = {"white"} onClick={uploadProfilePicture}>
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
            <p id="user_dorm" class="dorm-information-text">Current dorm : {userDorm?userDorm.dorm_name:<>Not belonging to any dorm</>}</p>
          </div>
            <div className="dorm-interactions-box">{userDorm?<>
              <BtnMedium withBorder={true} withBackground={true} backgroundColor={"red"} onClick={handleLeaveDorm}>Leave Dorm</BtnMedium>
            </>:<>
            <BtnMedium withBorder={true} withBackground={true}>Join a Dorm</BtnMedium>
            </>}
            <BtnMedium withBorder={true} withBackground={true} disabled={disabled} onClick={saveUserChanges}>Save Changes</BtnMedium>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;