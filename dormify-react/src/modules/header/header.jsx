import "./header.css";
import BtnSmall from "../buttons/small/btn-small";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/profile-icon.png";

const Header_ = () => {
  const nav = useNavigate();
  function onSignupClick(event) {
    nav("signup");
  }
  function onLoginClick(event) {
    nav("login");
  }
  function onHomeClick(event) {
    nav("/");
  }
  function onProfileClick(event){
    nav("profile");
  }
  return (
    <>
      <div class="header-container-row">
        <div className="box-invisible" style={{ width: "40px" }}></div>
        <div className="box logo"></div>
        <div className="box-invisible" style={{ width: "670px" }}></div>
        <BtnSmall
          className="box"
          withBackground={false}
          withBorder={false}
          textColor={"black"}
          onClick={onHomeClick}
        >
          Home
        </BtnSmall>
        <BtnSmall
          className="box"
          withBackground={false}
          withBorder={false}
          textColor={"black"}
        >
          {" "}
          Services{" "}
        </BtnSmall>
        <BtnSmall
          className="box"
          withBackground={false}
          withBorder={false}
          onClick={onLoginClick}
        >
          Login
        </BtnSmall>
        <BtnSmall
          withBackground={true}
          withBorder={true}
          onClick={onSignupClick}
          className="box"
        >
          Signup
        </BtnSmall>
        <div className="user-info-container">
            <button className="user-pic-button" onClick={onProfileClick}>
          <img src={profileIcon} alt="Admin" className="user-pic-header" />
            </button>
        </div>
      </div>
    </>
  );
};
export default Header_;
