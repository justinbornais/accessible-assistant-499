import Xarrow from "react-xarrows";
import { Fragment, useState } from "react";

export default function Tutorial() {

  const [progress, setProgress] = useState(0);

  const advanceProgress = () => {
    setProgress(progress + 1);
  }

  console.log(progress);

  const renderByProgress = () => {
    switch(progress) {
      case 0:
        return (
          <>
            <p id="tutorial-text" style={{display: "inline-block", position: "absolute", left: "30%", top: "30%"}}>Decrease font here</p>
            <Xarrow start="tutorial-text" end="decrease-font" startAnchor="top" endAnchor="bottom" strokeWidth="10" />
          </>
        );
      case 1:
        return (
          <>
            <p id="tutorial-text" style={{display: "inline-block", position: "absolute", left: "40%", top: "30%"}}>Increase font here</p>
            <Xarrow start="tutorial-text" end="increase-font" startAnchor="top" endAnchor="bottom" strokeWidth="10" />
          </>
        );
      case 2:
        return (
          <>
            <p id="tutorial-text" style={{display: "inline-block", position: "absolute", left: "50%", top: "30%"}}>Slow down audio here</p>
            <Xarrow start="tutorial-text" end="decrease-speed" startAnchor="top" endAnchor="bottom" strokeWidth="10" />
          </>
        );
      case 3:
        return (
          <>
            <p id="tutorial-text" style={{display: "inline-block", position: "absolute", left: "60%", top: "30%"}}>Speed up audio here</p>
            <Xarrow start="tutorial-text" end="increase-speed" startAnchor="top" endAnchor="bottom" strokeWidth="10" />
          </>
        );
      case 4:
        return (
          <>
            <p id="tutorial-text" style={{display: "inline-block", position: "absolute", left: "43.125%", top: "30%"}}>Toggle these buttons here</p>
            <Xarrow start="tutorial-text" end="accessibility-button" startAnchor="top" endAnchor="bottom" strokeWidth="10" color="red" />
          </>
        );
      case 5:
        return (
          <>
            <p id="tutorial-text" style={{display: "inline-block", position: "absolute", left: "37.35%", top: "65%"}}>Write your questions here</p>
            <Xarrow start="tutorial-text" end="type-chat" startAnchor="bottom" endAnchor="top" strokeWidth="10" />
          </>
        );
      case 6:
        return (
          <>
            <p id="tutorial-text" style={{display: "inline-block", position: "absolute", left: "50%", top: "65%"}}>Submit to the AI here</p>
            <Xarrow start="tutorial-text" end="submit-chat" startAnchor="bottom" endAnchor="top" strokeWidth="10" />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Fragment>
      {progress < 7 &&
      <div id="tutorial" onClick={() => advanceProgress()}>
        {renderByProgress()}
      </div>
      }
    </Fragment>
  )
}