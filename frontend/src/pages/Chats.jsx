import React, {useState} from "react";
import { Button } from 'react-bootstrap';
import Markdown from 'react-markdown';

export default function Chats() {
  const [chatList, setChatList] = useState(JSON.parse(window.localStorage.getItem('chats')) || []);
  const [question, setQuestion] = useState("");
  const visualizeImage = {
    width: "300px",
    height: "250px",
    display: "none"
  }
  //To change image either change this value or u can overwrite the image it is pointing to
  const handleChange = event => {
    setQuestion(event.target.value);
  }
  //fetch function, having flask route set a 
  const addChat = async () => {
    try {
      const response = await fetch('http://localhost:5000/chats/ask', {
        'method': 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ question: question })
      });
      const data = await response.json();
      const newList = chatList.concat({ userName: 'Guest', userMsg: question, AIMsg: data['answer'], id: data['response-id'] }); // Add new prompt.
      window.localStorage.setItem('chats', JSON.stringify(newList)); // Add new prompt to local storage.
      setChatList(JSON.parse(window.localStorage.getItem('chats'))); // Set current state to the new local storage list.
      setQuestion("");
    } catch (error) {
      console.error(error);
    }
  }

  const getAudio = async (id) => {
    let audioElm = document.getElementById(id);
    if(audioElm.getAttribute("src")) {
      audioElm.play();
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/chats/get-audio?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      audioElm.src = `data:audio/wav;base64,${data["data"]}`;
      audioElm.play();
    } catch (error) {
      console.error(error);
    }
  }


  const toggleImage = (id) => {

    console.log(id);

    let imgTag = document.getElementById(`img-${id}`);

    //Currently having static images being randomized
    if(Math.floor(Math.random() * (3)) + 1 === 1) {
      imgTag.src = "../../images/Robot.jpg";
    }
    else if (Math.floor(Math.random() * (3)) + 1 === 2) {
      imgTag.src = "../../images/Robot2.jpg";
    }
    else if (Math.floor(Math.random() * (3)) + 1 === 3) {
      imgTag.src = "../../images/Robot3.jpg";
    }

    if(imgTag.style.display === "none") {
      imgTag.style.display = "block";
    } else {
      imgTag.style.display = "none";
    }
  };

  return (
    <>
      <h2 className="text-center">Accessible Assistant</h2>
      {/* <h4 className="text-center">Making ChatGPT accessible to all</h4> */}
      <div className="mainScreen container-fluid px-5">
        <div className="col1 d-flex flex-column">
          <div className="allChats d-flex flex-column" style={{border:"10px"}}>
            {chatList.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="userMessage row">
                    <div className="col-2 col-lg-1 d-flex justify-content-end">
                      <img className="visualizeImg sticky-top" src="../../images/guest.png" alt="Guest"></img>
                    </div>
                    <div className="col-10 col-lg-11">
                      <Markdown>{data.userMsg}</Markdown>
                    </div>
                  </div>
                  <div className="aiResponse row">
                    <div className="col-2 col-lg-1 d-flex justify-content-end">
                      <img className="visualizeImg sticky-top" src="../../images/robot.png" alt="AI"></img>
                    </div>
                    <div className="col-10 col-lg-9">
                      <Markdown>{data.AIMsg}</Markdown>
                    </div>
                    <div className="col-12 col-lg-2 text-center">
                      <Button className="m-1 sticky-top" onClick={() => toggleImage(data.id)}>
                        <img className="visualizeImg" src="../../images/visualize.png" alt="Toggle"></img>
                      </Button>
                      <Button className="m-1 sticky-top" onClick={async () => {getAudio(data.id)}}>
                        <img className="visualizeImg" src="../../images/audio.png" alt="Play Audio"></img>
                        <audio className="chatAudio" src="" controls id={data.id} type="audio/wav" style={{display: "none"}}></audio>
                      </Button>
                    </div>
                  </div>
                  <div className="col2 d-flex flex-column align-items-center">
                    <img id={`img-${data.id}`} className="visualizedImage" alt="Visualized Result" style={visualizeImage}></img>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
        {chatList.length === 0 && <div style={{width: "100px", height: "100px"}}></div>}
      </div>
      <div className="chatbar container d-flex flex-row align-items-center justify-content-center">
        <div className="TextBox align-self-center p-2 w-75 mw-50 py-2" id="type-chat">
          <input value={question} onChange={handleChange} className="w-100 h-100 py-3" name="userQuery" placeholder="What can I help you with?"
            style={{
              textAlignVertical: "top",
              borderColor: "#7da2a9",
              borderRadius: "10px"
            }}/>
        </div>
        <div className="SubmitBtn align-self-center p-2" id="submit-chat">
          <Button onClick={addChat} className="py-3">
            Ask ChatGPT
          </Button>
        </div>
      </div>
    </>
  )
}