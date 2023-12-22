import React, {useState} from "react";
import { Button } from 'react-bootstrap';
//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
export default function Chats() {
  const [chatList, addChatEntry] = useState([]);
  var currentUserResponse = "";
  const handleChange = event => {
    currentUserResponse = event.target.value;
  }
  const addChat = () => { const newList = chatList.concat({ userName: 'Guest', userMsg: currentUserResponse, AIMsg: 'AIResponse' }); addChatEntry(newList); }
  return (
    <>
      <center><h2>Chat History</h2></center>
      <div className="allChats container d-flex flex-column align-items-center" style={{border:"10px", height:"380px",overflowX:"hidden", overflowY:"auto"}}>
        {chatList.map(function (data) {
          return (
            <><div className="userMessage container d-flex flex-row justify-content-center">
              <p>{data.userName}: </p><p>{data.userMsg}</p>
            </div><div className="aiResponse container d-flex flex-row justify-content-center">
                <p>ChatGPT: </p><p>{data.AIMsg}</p>
              </div></>
        )
      })}
      </div>
      <div className="chatbar container d-flex flex-row align-items-center justify-content-center">
            <div className="TextBox align-self-center p-2 w-30 mw-50" style={{height:"55px"}}>
          <input onChange={handleChange} className="w-100 h-100" name="userQuery" placeholder="What can I help you with?" style={{textAlignVertical:"top",borderColor:"#7da2a9",borderRadius:"10px"}}/>
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