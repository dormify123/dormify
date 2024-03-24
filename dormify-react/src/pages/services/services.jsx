import BtnMedium from '../../modules/buttons/medium/btn-medium';
import {registerUserRole} from '../../utils/services/users'
const Services = (session_) => {
    let {session} = session_;
    let {user} = session;
    function onRegisterResidentClick() {
        registerUserRole(user, "resident");
    }
    return (
        <>
           <BtnMedium onClick={onRegisterResidentClick}>Register as resident</BtnMedium> 
        </>
    )
}
export default Services;