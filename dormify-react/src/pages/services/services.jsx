import './services.css'
import BtnMedium from '../../modules/buttons/medium/btn-medium'
import {registerUserRole} from '../../utils/services/users'
const Services = (session_) => {
    let {session} = session_;
    let {user} = session;
    async function onRegisterRoleClick(role) {
        console.log(role);
        let message = await registerUserRole(user, role);
        console.log(message);
    }
    return (
        <>
        <div className = "wrapper">
            <div className = "message-box">
                <div className = "services-message">
                    <h className = "message-text-large">Looks like you dont belong to any dorm</h>
                    <h className = "message-text-small">Let's get you started</h>
                </div>
                <div className="services-box">
                    <div className = "services-message box">
                    <h className ="message-text-small">I am a:</h>
                    </div>
                    <BtnMedium className="services-row-box" withBackground={true} withBorder={true}>Resident</BtnMedium>
                    <BtnMedium className="services-row-box" withBackground={true} withBorder={true}>Dorm Owner</BtnMedium>
                </div>
            </div>

        </div>

        </>
    )
}
export default Services;