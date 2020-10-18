import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

function ChatHeader() {

    const chatRoom = useSelector(state => state.selectedChatRoom);
    return (
        <div className="chat-header">
            <div className="chat-room-name">{chatRoom.name}</div>
            <div className="chat-room-users">
                {chatRoom.users ? chatRoom.users.join() : ""}
            </div>
        </div>
    );
}

export default ChatHeader;