import React from "react";
import { useSelector } from "react-redux";
import ChatMessage from "../ChatMessage";
import "./styles.css";

function MessageList(props) {

    const chatRoom = useSelector(state => state.selectedChatRoom);
    // const userDetails = useSelector(state => state.userDetails);

    // if ( chatRoom && chatRoom.messages) {
    //     console.log("Message count " + chatRoom.messages.length);
    // } else {
    //     console.log("No messages in room");
    // }
    // return (
    //     <div className="message-list"> 
    //         {chatRoom && chatRoom.messages && chatRoom.messages.map((chatMessage) =>
    //             <div className={ chatMessage.name === userDetails.name ? "current-user-chat-message" : "chat-message"}>
    //                 <div className={ chatMessage.name === userDetails.name ? "current-user-message-content" : "chat-message-content"}>{chatMessage.message} </div>
    //                 { chatMessage.name !== userDetails.name && <div className="chat-message-user">{chatMessage.name} </div> }
    //             </div>)
    //         }
    //     </div>
    // );   

    return (
        <div className="message-list"> 
            {chatRoom && chatRoom.messages && chatRoom.messages.map((chatMessage) => {
                return <ChatMessage userName={chatMessage.name} message={chatMessage.message} />
            })}
        </div>  
    );

}

export default MessageList;