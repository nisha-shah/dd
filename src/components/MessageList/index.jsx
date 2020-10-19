import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "../ChatMessage";
import "./styles.css";

function MessageList() {
    const currentChatMessages = useSelector(state => state.currentChatMessages);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ block: "end", behavior: "smooth", inline: "nearest" })
    }
    useEffect(scrollToBottom, [currentChatMessages]);

    return (
        <div className="message-list" ref={messagesEndRef}>
            {currentChatMessages && currentChatMessages.map((chatMessage) => {
                return <ChatMessage userName={chatMessage.name} message={chatMessage.message} />
            })}
        </div>
    );

}

export default MessageList;