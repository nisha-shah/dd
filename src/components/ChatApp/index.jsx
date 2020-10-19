import React from "react";
import Login from "../Login";
import ChatRoom from "../ChatRoom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function ChatApp() {

    const userDetails = useSelector(state => state.userDetails);
    return (
        <div className="chat-app">
            {  !userDetails.name ? <Login /> : <ChatRoom userDetails={userDetails} />}
        </div>
    );
}

export default ChatApp;