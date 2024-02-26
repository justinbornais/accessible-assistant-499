
import React from "react";
import { Button } from 'react-bootstrap';

export default function ChatArea() {
    var currentUserResponse = "";
    const handleChange = event => {
        currentUserResponse = event.target.value;
    }
    const addChat = async () => {
        const storedChats = JSON.parse(window.localStorage.getItem('chats'));
        
        try {
            const response = await fetch('http://localhost:5000/chats/ask', {
              'method': 'POST',
              headers: {
                'Content-Type':'application/json'
              },
              body: JSON.stringify({ question: currentUserResponse })
            });
            const data = await response.json();
            console.log(response, data['answer'], data['response-id']);
            const newList = storedChats.concat({ userName: 'Guest', userMsg: currentUserResponse, AIMsg: data['answer'] });
            window.localStorage.setItem('chats', JSON.stringify(newList));
          } catch (error) {
            console.error(error);
        }
        finally {
            window.location.href = '/chats';
        }
    }
    return (
        <div className="chatsbar container d-flex flex-column align-items-center justify-content-center h-100">
            <div className="row TextBox align-self-center p-2" style={{ width: "100%" }}>
                <textarea name="userQuery" className="align-self-center p-2 mx-auto" onChange={handleChange} placeholder="What can I help you with?"
                style={{
                    width: "75%",
                    minHeight: "50vh",
                    maxHeight: "60vh",
                    textAlignVertical: "top",
                    borderColor: "#7da2a9",
                    borderRadius: "0.75rem",
                    resize: "none"
                }}/>
            </div>
            <div className="SubmitBtn align-self-center p-2">
                    <Button onClick={addChat}>
                        Ask ChatGPT
                    </Button>
            </div>
        </div>
    )
}