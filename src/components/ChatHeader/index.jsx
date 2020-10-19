import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

const stateToSelector = (state) => {
    const chatRoom = state.currentChatRoom,
        currentUserName = state.userDetails.name;
    return ({ chatRoom, currentUserName }); 
};

function ChatHeader() {

    const { chatRoom, currentUserName } = useSelector(stateToSelector);

    let firstName = null;
    let others = Object.assign([], chatRoom.users)
    if (chatRoom.users && chatRoom.users.includes(currentUserName)) {
        firstName = currentUserName;
        others = others.filter((name) => {return name !== firstName});
    }
    return (
        <div className="chat-header">
            <div className="chat-room-name">{chatRoom.name}</div>
            <div className="chat-room-users">
                <span className="current-user-name">{firstName}</span>
                {(firstName ? ", " : "") + others.join(", ")}
            </div>
        </div>
    );
}

export default ChatHeader;