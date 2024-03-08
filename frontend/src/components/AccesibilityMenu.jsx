import React, {useState} from "react";
import { Button, Image, Navbar, Nav } from 'react-bootstrap';
import '../index.css'

export default function AccesibilityMenu() { 
    const root = document.documentElement;
    const fontIncrement = parseFloat(0.1);
    const fontPrecision = 1;
    const currentFontSize = parseFloat(getComputedStyle(root).getPropertyValue('--fontsize'));
    const [menuEnabled, setMenuEnabled] = useState(true);
    const [fontsize, setFontSize] = useState(currentFontSize);
    const [speed, setSpeed] = useState(1);

    const toggleMenu = () => {
        setMenuEnabled(!menuEnabled);
    }

    const changeFontSize = (action) => {

        // Increase the font size based on action.
        if (action === 'increase') {
            const newSize = fontsize + fontIncrement;
            const newSizeString = `${newSize}rem`;
            root.style.setProperty('--fontsize', newSizeString);
            setFontSize(parseFloat(newSize.toFixed(fontPrecision))); 
        }
        else {
            const newSize = fontsize - fontIncrement;
            const newSizeString = `${newSize}rem`;
            root.style.setProperty('--fontsize', newSizeString);
            setFontSize(parseFloat(newSize.toFixed(fontPrecision)));
        }
    }

    const changeSpeed = (action) => {
        if (action === 'increase') {
            document.querySelectorAll('audio').forEach((audio) => {
                audio.playbackRate = speed + 0.25;
            });
            setSpeed(speed + 0.25);
        }
        else {
            document.querySelectorAll('audio').forEach((audio) => {
                audio.playbackRate = speed - 0.25;
            });
            if (speed >= 0.5) setSpeed(speed - 0.25);
        }
    }

    return (
        <Navbar bg={menuEnabled ? 'light' : ''} expand="lg" variant="light" className="d-flex flex-column justify-content-center py-0">
            <Navbar.Brand onClick={toggleMenu}>
                <img className="visualizeImg" src="../../images/accesibility.png" alt="Accesibility Button"></img>
            </Navbar.Brand>
            { menuEnabled &&
                <Navbar.Collapse id="basic-navbar-nav" className={menuEnabled ? 'show' : ''}>
                    <Nav className="mr-auto flex-row">
                    {/* <Nav.Link>Profile: Default</Nav.Link> */}
                    <Nav.Link>
                        <Button onClick={() => changeFontSize('decrease')}>
                            <Image src="/images/decrease-font.webp" alt="-" style={{ width: '2rem', height: '2rem'}} />
                        </Button>
                    </Nav.Link>
                    <Nav.Link>
                        <Button onClick={() => changeFontSize('increase')}>
                            <Image src="/images/increase-font.webp" alt="+" style={{ width: '2rem', height: '2rem'}} />
                        </Button>
                    </Nav.Link>
                    <Nav.Link>
                        <Button onClick={() => changeSpeed('decrease')}>
                            <Image src="/images/slower.png" alt="-" style={{ width: '2rem', height: '2rem'}} />
                        </Button>
                    </Nav.Link>
                    <Nav.Link>
                        <Button onClick={() => changeSpeed('increase')}>
                            <Image src="/images/faster.png" alt="+" style={{ width: '2rem', height: '2rem'}} />
                        </Button>
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            }
        </Navbar>
    );
    
    // return (
    //     <div className="accesibilityBtn">
    //         <Button className="test border-0" onClick={toggleMenu}>
    //             <img src="../../images/accesibility.png" alt="Accesibility Button"></img>
    //         </Button>
    //         <div className="accesibilityMenu container d-flex flex-column align-items-center" style={divStyle}>
    //             <div className="option1 container d-flex flex-row justify-content-center">
    //                 <p>Profile:&nbsp;&nbsp;</p><p>Default</p>
    //             </div>
    //             <div className="option2 container d-flex flex-row justify-content-center">
    //                 <Button onClick={() => changeFontSize('decrease')}>
    //                     <Image src="/images/decrease-font.webp" alt="-" style={{ width: '2rem', height: '2rem'}} />
    //                 </Button>
    //                 <Button className="btn-static">{((fontsize - 0.2) * 100).toFixed(0)}%</Button>
    //                 <Button onClick={() => changeFontSize('increase')}>
    //                     <Image src="/images/increase-font.webp" alt="+" style={{ width: '2rem', height: '2rem'}} />
    //                 </Button>
    //             </div>
    //             <div className="option3 container d-flex flex-row justify-content-center">
    //                 <Button onClick={() => changeSpeed('decrease')}>
    //                     <Image src="/images/slower.png" alt="-" style={{ width: '2rem', height: '2rem'}} />
    //                 </Button>
    //                 <Button className="btn-static">{speed.toFixed(2)}x</Button>
    //                 <Button onClick={() => changeSpeed('increase')}>
    //                     <Image src="/images/faster.png" alt="-" style={{ width: '2rem', height: '2rem'}} />
    //                 </Button>
    //             </div>
    //         </div>
    //     </div>
    // )
}