import React, {useState,useRef} from "react";
import { Button } from 'react-bootstrap';
//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
export default function Chats() {
  const [chatList, setChatList] = useState(JSON.parse(window.localStorage.getItem('chats')));
  const [question, setQuestion] = useState("");
  const [imageEnabled, toggleImage] = useState(() => chatList.map(() => false));
  const [imageSrc, changeImg] = useState(() => chatList.map(() => "../../images/Robot.jpg"));
  const imgRefs = useRef(chatList.map(() => React.createRef()));
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
      console.log(response, data['answer'], data['response-id']);
      const newList = chatList.concat({ userName: 'Guest', userMsg: question, AIMsg: data['answer'], id: data['response-id'] }); // Add new prompt.
      window.localStorage.setItem('chats', JSON.stringify(newList)); // Add new prompt to local storage
      setChatList(JSON.parse(window.localStorage.getItem('chats'))); //Set current state to the new local storage list
      setQuestion("");
    } catch (error) {
      console.error(error);
    }
  }

  const getAudio = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/chats/get-audio?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      let audioElm = document.getElementById(id);
      audioElm.src = `data:audio/wav;base64,${data["data"]}`;
      // const audio = new Audio(audioElm.src);
      audioElm.play();
    } catch (error) {
      console.error(error);
    }
  }


  const visualizeChat =  (AIMsg,ImageId) => async () => {
      //Add code for calling backend and getting image
    //Currently having static images being randomized
    const img = imgRefs.current[ImageId];
    if (img) {
      let newImageSrc = "";
      try {
        const response = await fetch('http://localhost:5000/chats/generateImage', {
          'method': 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({ question: question })
        });
        const data = await response.json();
        console.log(response, data['answer']);
        newImageSrc = data['answer']
        changeImg(prevState => {
          const newState = [...prevState];
          newState[ImageId] = newImageSrc;
          return newState;
        });
      } catch (error) {
        console.error(error);
      }
      
      
    }
    console.log(AIMsg);
      
    toggleImage(prevState => {
      const newState = [...prevState];
      newState[ImageId] = !newState[ImageId];
      return newState;
    });
  }
  return (
    <>
      <div className="mainScreen container d-flex flex-row justify-content-center">
      
        <div className="col1 d-flex flex-column align-items-center">
      <center><h2>Chat History</h2></center>
      <div className="allChats container d-flex flex-column align-items-center" style={{border:"10px",maxWidth: "700px", height:"380px",overflowX:"hidden", overflowY:"auto"}}>
        {chatList.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <div className="userMessage container d-flex flex-row justify-content-center">
                <p>{data.userName}:&nbsp;&nbsp;</p><p>{data.userMsg}</p>
              </div>
              <div className="aiResponse container d-flex flex-row justify-content-center">
                <p>ChatGPT:&nbsp;&nbsp;</p>
                <p>{data.AIMsg}</p>
                <Button className="visualizeButton" onClick={visualizeChat(data.AIMsg,index)}>
                  <img className="visualizeImg" src="../../images/visualize.png" alt="Visualize Button"></img>
                </Button>
                <Button className="visualizeButton" onClick={async () => {getAudio(data.id)}}>
                  <img className="visualizeImg" src="../../images/audio.png" alt="Visualize Button"></img>
                  <audio className="chatAudio" src="" controls id={data.id} type="audio/wav" style={{display: "none"}}></audio>
                </Button>
              </div>
              <div className="col2 d-flex flex-column align-items-center">
                <img className="visualizedImage" src={imageSrc[index]} alt="Visualized Result" style={{ display: imageEnabled[index] ? 'block' : 'none', width:"300px",height:"250px"}} ref={(el) => imgRefs.current[index] = el} id={index}></img>
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