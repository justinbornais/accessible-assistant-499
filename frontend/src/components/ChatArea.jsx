
import React from "react";
import { Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';

// function MoveToChatPage(text) {
//     const navigation = useNavigate();
//     console.log(text);
//     //Add query to local storage
//     // useEffect(() => navigation('/chats', { replace: true }));
// }
export default function ChatArea() {
    return (
        <div className="chatsbar container d-flex flex-column align-items-center justify-content-center h-100">
            <div className="TextBox align-self-center p-2">
                <input name="userQuery" placeholder="What can I help you with?" style={{width: "300px", height: "300px", textAlignVertical:"top",borderColor:"#7da2a9",borderRadius:"10px"}}/>
            </div>
            <div className="SubmitBtn align-self-center p-2">
                <Link to="/chats">
                    <Button>
                        Ask ChatGPT
                    </Button>
                </Link>
            </div>
        </div>
    )
}