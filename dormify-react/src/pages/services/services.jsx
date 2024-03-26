import './services.css'
import BtnMedium from '../../modules/buttons/medium/btn-medium'
import {registerUserRole, getUserDorm, getUserRole,createDorm, joinDorm} from '../../utils/services/users'
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
const Services = (session_) => {
    let {session} = session_;
    let {user} = session;
    const nav = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [userDorm, setUserDorm] = useState(0);
    useEffect(() =>{
        const fetchUserRole = async()=>{
            const role = await getUserRole(session.user);
            setUserRole(role);
        }
        const fetchUserDorm = async()=>{
            const dorm_id = await getUserDorm(session.user);
            setUserDorm(dorm_id);
        }
        fetchUserDorm();
        fetchUserRole();
    },[]);
    async function onRegisterRoleClick(role) {
        console.log(role);
        let message = await registerUserRole(user, role);
        setUserRole(role);
        console.log(message);
        nav('/services');
    }
    async function onCreateDormClick(){
        let dorm_name = document.getElementById("dorm_name");
        console.log(dorm_name.value);
        let dorm_email = document.getElementById("dorm_email");
        let dorm_location = document.getElementById("dorm_location");
        let dorm_rooms = document.getElementById("dorm_room_num");
        let error = createDorm(dorm_name.value, dorm_email.value,dorm_location.value,dorm_rooms.value, user);
        if(error)
            document.getElementById("error").innerHTML = error.message;
        nav('/profile');
        
    }
    async function onJoinDormClick(){
        let error = joinDorm(user,document.getElementById("dorm_id").value);
        console.log(error);
        nav('/profile');
    }
    return (
        <>
            {!userRole ? (
                <>
                    <div className="wrapper">
                        <div className="message-box">
                            <div className="services-message">
                                <h className="message-text-large">Looks like you haven't selected a role</h>
                                <h className="message-text-small">Let's get you started</h>
                            </div>
                            <div className="services-box">
                                <div className="services-message box">
                                    <h className="message-text-small">I am a:</h>
                                </div>
                                <BtnMedium className="services-row-box" withBackground={true} withBorder={true} onClick={() => onRegisterRoleClick("resident")}>Resident</BtnMedium>
                                <BtnMedium className="services-row-box" withBackground={true} withBorder={true} onClick={() => onRegisterRoleClick("dormowner")}>Dorm Owner</BtnMedium>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                !userDorm ? (
                    <>
                        <div className="wrapper">
                            <div className="message-box">
                                <div className="services-message">
                                    <h className="message-text-large">Looks like you don't belong to a dorm</h>
                                    <h className="message-text-small">{(userRole === "dormowner")?<>Create a dorm here</>:<>Join a dorm below:</>}</h>
                                </div>
                                <div className="services-box">
                                    {(userRole === "dormowner")?<>
                                    <form className="dorm-creation-form">
                                        <div className="form-creation-box">
                                            <label htmlFor="dorm_name"></label>
                                            <input  id ="dorm_name" className="dorm-creation-input" type ="text" placeholder='enter dorm name'></input>
                                            <label htmlFor="dorm_email"></label>
                                            <input id="dorm_email" className="dorm-creation-input" type = "text" placeholder='enter dorm email'></input>
                                        </div>
                                        <div className="form-creation-box">
                                            <label htmlFor="dorm_location"></label>
                                            <input className="dorm-creation-input" id="dorm_location" type = "text" placeholder='enter location'></input>
                                            <label htmlFor="dorm_room_num"></label>
                                            <input className="dorm-creation-input" id = "dorm_room_num" type ="number" placeholder='enter number of rooms'></input>
                                        </div>
                                        <BtnMedium withBackground={true} withBorder={true} onClick={onCreateDormClick}>submit</BtnMedium>
                                        <p id="error"></p>
                                    </form>
                                    
                                    </>:<>
                                    <h className ="message-text-small"> Enter dorm id to join</h>
                                    <input id ="dorm_id" type ="number" className="dorm-creation-input" style={{maxWidth:"50px"}}></input>
                                    <BtnMedium onClick={onJoinDormClick} withBackground={true} withBorder={true}>Enter dorm</BtnMedium>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </>
                ) : <><div class="wrapper">
                    <div className="message-box">
                        <h className = "message-text-large">{(userRole === "dormowner")?<>Manage your dorm here</>:<>Register for services</>}</h>
                    </div>
                    </div></>
            )}
        </>
    )
    
}
export default Services;