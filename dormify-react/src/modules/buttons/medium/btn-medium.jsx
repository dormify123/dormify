import './btn-medium.css';
import React, { useRef } from 'react';
const BtnMedium = ({children, withBackground, withBorder, textColor,onClick, backgroundColor, hoverDisabled}) => {
    let button_class = "btn-medium"
    const buttonRef = useRef(null);

    if(withBackground)
        button_class += " with-background";
    if(withBorder)
        button_class += " with-border";
    function handleMouseEnter(e){
        if (buttonRef.current && !hoverDisabled) {
            buttonRef.current.classList.add("hover");
        }
    }
    function handleMouseLeave(e){
        if (buttonRef.current && !hoverDisabled) {
            buttonRef.current.classList.remove("hover");
        }
    }
    return (
        <>
            <div ref={buttonRef} className={button_class} onClick={onClick} style = {{color:textColor, background:backgroundColor}} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>
                {children}
            </div>
        </>
    );
};
export default BtnMedium;