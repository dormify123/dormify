import './header.css'
import BtnSmall from '../buttons/small/btn-small'
import {useNavigate} from 'react-router-dom'
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
    async function onSignoutClick(event){
        let error = await userSignOut();
        if(error)
            alert(error.message);
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
                {session?
                (<>
                <p className="box" onClick={onSignoutClick}>sign out</p>
                <p className="box">profile page</p>
                </>):
                (<>
                <BtnSmall className = "box" withBackground={false} withBorder={false} onClick={onLoginClick}>Login</BtnSmall>
                <BtnSmall className = "box" withBackground={true} withBorder={true} onClick={onSignupClick}>Register</BtnSmall>
                </>)}
            </div>
        </>
    );
};
export  default Header_;