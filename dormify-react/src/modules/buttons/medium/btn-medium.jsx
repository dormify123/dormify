import './btn-medium.css';
import React, { useRef } from 'react';
const BtnMedium = ({children, withBackground, withBorder, textColor,onClick, backgroundColor, disabled}) => {
    let button_class = "btn-medium"
    const buttonRef = useRef(null);
    async function handleClick(){
        if(!disabled)
            onClick();
    }
    if(withBackground)
        button_class += " with-background";
    if(withBorder)
        button_class += " with-border";
    if(disabled)
    {
        backgroundColor = "lightgray";
    }
    function handleMouseEnter(e){
        if (buttonRef.current && !disabled) {
            buttonRef.current.classList.add("hover");
        }
    }
    function handleMouseLeave(e){
        if (buttonRef.current && !disabled) {
            buttonRef.current.classList.remove("hover");
        }
    }
    return (
        <>
            <div ref={buttonRef} className={button_class} onClick={handleClick} style = {{color:textColor, background:backgroundColor}} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>
                {children}
            </div>
        </>
    );
};
export default BtnMedium;