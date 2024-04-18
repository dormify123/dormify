import "./header.css";
import BtnSmall from "../buttons/small/btn-small";
import { useNavigate } from "react-router-dom";
import './header.css'
import {userSignOut} from '../../utils/services/auth'
const Header_ = (session_) => {
    const {session} = session_;
    console.log(session);
    const nav = useNavigate();
    function onSignupClick(event){
        nav('signup');
    }
    function onLoginClick(event){
        nav('login');
    }
    function onHomeClick(event){
        nav('/');
    }
    function onServicesClick(event){
        if(session)
            nav('services');
        else 
            nav('signup');
    }
    async function onSignoutClick(event){
        let error = await userSignOut();
        if(error)
            alert(error.message);
        nav('/');
    }
    async function onProfileClick(event){
      nav('/profile');
    }
    return (
        <>
            <div className="header-container-row">
                <div className ="box-invisible" style = {{width:'40px'}}></div>
                <div className = "box logo"></div>
                <div className="user-control-row">
                    <BtnSmall className = "" withBackground={false} withBorder = {false} textColor={"black"} onClick = {onHomeClick}>Home</BtnSmall>
                    <BtnSmall className ="" withBackground={false} withBorder={false} textColor={"black"} onClick={onServicesClick}>Services</BtnSmall>
                {session?
                (<>
                <BtnSmall className="box" withBackground={false} withBorder={false} onClick={onSignoutClick} textColor="red">Sign out</BtnSmall>
                <div className="box-invisible" style={{width:'20px'}}></div>
                <div className="user-info-container">
                <button className="user-pic-button" onClick={onProfileClick}>
                  <img src={require('../../assets/profile-icon.png')} alt="Admin" className="user-pic-header" />
                </button>
                </div>
                </>):
                (<>
                <BtnSmall className = "box" withBackground={false} withBorder={false} onClick={onLoginClick}>Login</BtnSmall>
                <BtnSmall className = "box" withBackground={true} withBorder={true} onClick={onSignupClick}>Register</BtnSmall>
                </>)}
            </div>
            </div>
        </>
    );
};
export default Header_;
