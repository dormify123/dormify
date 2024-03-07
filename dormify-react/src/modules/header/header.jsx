import './header.css'
const Header_ = () => {

    return (
        <>
            <div class="header-container-row">
                <div className ="box-invisible" style = {{width:'40px'}}></div>
                <div className = "box logo"></div>
                <div className = "box-invisible" style = {{width:'670px'}}></div>
                <p className = "box">Home</p>
                <p className ="box"> Services </p>
                <div className ="box login-btn">Login</div>
                <div className = "box signup-btn">Signup</div>
            </div>
        </>
    );
};
export  default Header_;