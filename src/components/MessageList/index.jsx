import React from "react";
import { useSelector } from "react-redux";
import ChatMessage from "../ChatMessage";
import "./styles.css";

function MessageList(props) {

    const currentChatMessages = useSelector(state => state.currentChatMessages);

    return (
        <div className="message-list">
            {currentChatMessages && currentChatMessages.map((chatMessage) => {
                return <ChatMessage userName={chatMessage.name} message={chatMessage.message} />
            })}
        </div>
    );

}

export default MessageList;