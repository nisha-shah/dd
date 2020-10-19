import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

function ChatMessage(props) {

    const userDetails = useSelector(state => state.userDetails);

    return (
        <div className={props.userName === userDetails.name ? "current-user-chat-message" : "chat-message"}>
            <div className={props.userName === userDetails.name ? "current-user-message-content" : "chat-message-content"}>
                {props.message}
            </div>
            { props.userName !== userDetails.name && <div className="chat-message-user">{props.userName} </div>}
        </div>
    );
}

export default ChatMessage;
