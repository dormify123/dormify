import './btn-small.css';
import React, { useRef } from 'react';
const BtnSmall = ({children, withBackground, withBorder, textColor,onClick}) => {
    let button_class = "btn-small"
    const buttonRef = useRef(null);

    if(withBackground)
        button_class += " with-background";
    if(withBorder)
        button_class += " with-border";
    function handleMouseEnter(e){
        console.log("mouseEnter");
        if (buttonRef.current) {
            buttonRef.current.classList.add("hover");
        }
    }
    function handleMouseLeave(e){
        console.log("mouseLeave");
        if (buttonRef.current) {
            buttonRef.current.classList.remove("hover");
        }
    }
    return (
        <>
            <div ref={buttonRef} className={button_class} onClick={onClick} style = {{color:textColor}} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>
                {children}
            </div>
        </>
    );
};
export default BtnSmall;