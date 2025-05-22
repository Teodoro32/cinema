import React from "react";

function Button({
    type = "button",
    variant = "danger",
    onClick,
    isModal = false,
    children,
}){

    return (
        <button className={`btn btn-${variant}`} type={type} onClick={!isModal ? onClick : undefined}> {children}</button>
    );
};

export default Button;