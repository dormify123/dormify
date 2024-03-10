import './header.css'
import BtnSmall from '../buttons/small/btn-small'
import {useNavigate} from 'react-router-dom';
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
    return (
        <>
            <div className="header-container-row">
                <div className ="box-invisible" style = {{width:'40px'}}></div>
                <div className = "box logo"></div>
                <div className = "box-invisible" style = {{width:'670px'}}></div>
                <BtnSmall className = "box" withBackground={false} withBorder = {false} textColor={"black"} onClick = {onHomeClick}>Home</BtnSmall>
                <BtnSmall className ="box" withBackground={false} withBorder={false} textColor={"black"}> Services </BtnSmall>
                {session? <p>sign out</p>:<BtnSmall className ="box" withBackground={false} withBorder={false} onClick = {onLoginClick}>Login</BtnSmall>}
                {session? <p>{session.user.email}</p>:<BtnSmall id = "signup_btn" withBackground={true} withBorder={true} onClick={onSignupClick} className ="box">Signup</BtnSmall>}
            </div>
        </>
    );
};
export  default Header_;