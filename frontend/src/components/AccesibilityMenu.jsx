import React, {useState} from "react";
import { Button } from 'react-bootstrap'; 
import '../index.css'

export default function AccesibilityMenu() { 
    const root = document.documentElement;
    const currentFontSize = parseFloat(getComputedStyle(root).getPropertyValue('--fontsize'));
    const [menuEnabled, toggleAccMenu] = useState("visible");
    const [fontsize, setFontSize] = useState(currentFontSize);
    const [speed, setSpeed] = useState(1);
    const toggleMenu = () => {
        if (menuEnabled === "visible") {
            toggleAccMenu("hidden");
        }
        else {
            toggleAccMenu("visible");
        }
        console.log(menuEnabled);
    }
    const changeFontSize = (action) => {
        if (action === 'increase') {
            setFontSize(fontsize + 1); 
        }
        else {
            setFontSize(fontsize - 1);
            
        }
        const string = fontsize.toString().concat("px");
        console.log(string);
        root.style.setProperty('--fontsize', string);
    }
    const changeSpeed = (action) => {
        if (action === 'increase') {
            console.log("Increased Speed");
            setSpeed(speed + 0.25);
            //Add Code for changing the value in backend
        }
        else {
            console.log("Decreased Speed");
            if (speed > 0) setSpeed(speed - 0.25);
            //Add code for changing the value in backend
        }
    }
    const divStyle = {
        visibility: menuEnabled,
        border: "2px",
        borderColor: "black",
        borderStyle: "solid",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "white",
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
                <div className="option2 container d-flex flex-row justify-content-center">
                    <Button onClick={() => changeFontSize('decrease')}>-</Button><Button className="btn-static">{currentFontSize}px</Button><Button onClick={() => changeFontSize('increase')}>+</Button>
                </div>
                <div className="option3 container d-flex flex-row justify-content-center">
                    <Button onClick={() => changeSpeed('decrease')}>-</Button><Button className="btn-static">{speed.toFixed(2)}x</Button><Button onClick={() => changeSpeed('increase')}>+</Button>
                </div>
            </div>
        </div>
    )
}