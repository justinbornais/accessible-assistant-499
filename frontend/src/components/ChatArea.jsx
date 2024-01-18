
import React from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ChatArea() {
    var currentUserResponse = "";
    const handleChange = event => {
        currentUserResponse = event.target.value;
    }
    const addChat = () => {
        const storedChats = [];
        const newList = storedChats.concat({ userName: 'Guest', userMsg: currentUserResponse, AIMsg: 'AIResponse' });
        localStorage.setItem('chats', JSON.stringify(newList));
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
                <Link to="/chats">
                    <Button onClick={addChat}>
                        Ask ChatGPT
                    </Button>
                </Link>
            </div>
        </div>
    )
}