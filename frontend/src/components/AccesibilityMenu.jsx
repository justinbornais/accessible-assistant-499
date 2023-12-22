import React, {useState} from "react";
import { Button } from 'react-bootstrap';

export default function AccesibilityMenu() { 
    const [menuEnabled, toggleAccMenu] = useState("hidden");
    const toggleMenu = () => {
        if (menuEnabled === "visible") {
            toggleAccMenu("hidden");
        }
        else {
            toggleAccMenu("visible");
        }
        console.log(menuEnabled);
    }
    const divStyle = {
        visibility: menuEnabled,
        border: "10px",
        width: "100px",
        height: "100px"
    }
    
    return (
        <div className="accesibilityBtn">
            <Button className="test border-0" onClick={toggleMenu}>
                <img src="../../images/accesibility.png" alt="Accesibility Button"></img>
            </Button>
            <div className="accesibilityMenu container d-flex flex-column align-items-center" style={divStyle}>
                <div className="option1 container d-flex flex-row justify-content-center">
                    <p>Profile: </p><p>Default</p>
                </div>
            </div>
        </div>
    )
}