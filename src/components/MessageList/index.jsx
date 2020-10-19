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

    return (<React.Fragment>
        <div className="message-list">
            {currentChatMessages && currentChatMessages.map((chatMessage, idx) => {
                return <ChatMessage key={idx} userName={chatMessage.name} message={chatMessage.message} />
            })}
        </div>
        <div ref={messagesEndRef}></div>
    </React.Fragment>
    );

}

export default MessageList;