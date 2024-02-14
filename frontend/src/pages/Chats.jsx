import React, {useState} from "react";
import { Button } from 'react-bootstrap';
//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
export default function Chats() {
  const [chatList, setChatList] = useState(JSON.parse(window.localStorage.getItem('chats')));
  const [question, setQuestion] = useState("");
  const [imageEnabled, toggleImage] = useState("none");
  const [imageSrc, changeImg] = useState("../../images/Robot.jpg");
  const visualizeImage = {
    display: imageEnabled,
    width: "300px",
    height: "250px"
    
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
      const data = await response.json()
      console.log(response, data['answer']);
      const newList = chatList.concat({ userName: 'Guest', userMsg: question, AIMsg: data['answer'] }); //Add new prompt
      window.localStorage.setItem('chats', JSON.stringify(newList)); //Add new prompt to local storage
      setChatList(JSON.parse(window.localStorage.getItem('chats'))); //Set current state to the new local storage list
      setQuestion("");
    } catch (error) {
      console.error(error);
    }
  }


  const visualizeChat = value => () => {
      //Add code for calling backend and getting image
      //Currently having static images being randomized
      if (Math.floor(Math.random() * (3 - 1 + 1)) + 1 === 1) {
        changeImg("../../images/Robot.jpg");
      }
      else if (Math.floor(Math.random() * (3 - 1 + 1)) + 1 === 2) {
        changeImg("../../images/Robot2.jpg");
      }
      else if (Math.floor(Math.random() * (3 - 1 + 1)) + 1 === 3) {
        changeImg("../../images/Robot3.jpg");
      }
        if (imageEnabled === "block") {
            toggleImage("none");
        }
        else {
            toggleImage("block");
      }
  }
  return (
    <>
      <div className="mainScreen container d-flex flex-row justify-content-center">
      
        <div className="col1 d-flex flex-column align-items-center">
      <center><h2>Chat History</h2></center>
      <div className="allChats container d-flex flex-column align-items-center" style={{border:"10px", height:"380px",overflowX:"hidden", overflowY:"auto"}}>
        {chatList.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <div className="userMessage container d-flex flex-row justify-content-center">
                <p>{data.userName}:&nbsp;&nbsp;</p><p>{data.userMsg}</p>
              </div>
              <div className="aiResponse container d-flex flex-row justify-content-center">
                <p>ChatGPT:&nbsp;&nbsp;</p><p>{data.AIMsg}</p><Button className="visualizeButton" onClick={visualizeChat(data.AIMsg)}><img className="visualizeImg" src="../../images/visualize.png" alt="Visualize Button"></img></Button>
              </div>
              <div className="col2 d-flex flex-column align-items-center">
                <img className="visualizedImage" src={imageSrc} alt="Visualized Result" style={visualizeImage}></img>
              </div>
            </React.Fragment>
        )
      })}
          </div>
        </div>
        
        </div>
      <div className="chatbar container d-flex flex-row align-items-center justify-content-center">
            <div className="TextBox align-self-center p-2 w-30 mw-50" style={{height:"55px"}}>
          <input value={question} onChange={handleChange}  className="w-100 h-100" name="userQuery" placeholder="What can I help you with?"
            style={{
              textAlignVertical: "top",
              borderColor: "#7da2a9",
              borderRadius: "10px"
            }}/>
            </div>
            <div className="SubmitBtn align-self-center p-2">
                    <Button onClick={addChat}>
                        Ask ChatGPT
                    </Button>
            </div>
        </div>
    </>
  )
}