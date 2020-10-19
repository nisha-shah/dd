import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WebSocketContext } from "../../WebSocket";
import { ADD_NEW_ROOM_MESSAGE } from "../../redux/actions";
import "./styles.css";

function NewMessage(props) {

    const currentChatRoom = useSelector(state => state.currentChatRoom);
    const userDetails = useSelector(state => state.userDetails);
    const [newMessage, setNewMessage] = useState("");

    const ws = useContext(WebSocketContext);
    const dispatch = useDispatch();

    const dispatchNewMessage = (message) => {
        dispatch({ type: ADD_NEW_ROOM_MESSAGE, data: message });
        props.onSendMessage(message);
        setNewMessage("");
    }

    const handleNewSendMessage = () => {
        if (newMessage !== "") {
            const message = {
                name: userDetails.name,
                message: newMessage,
                reaction: null,
                roomId: currentChatRoom.id
            };
            ws.sendMessage(message, dispatchNewMessage);
        }
    }

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }

    return (
        <div className="new-message">
            <input type="text" placeholder="Type your message..." onChange={handleNewMessageChange} value={newMessage} className="input-chat-box" />
            <button className="btn-send" onClick={handleNewSendMessage}>Send</button>
        </div>
    );
}

export default NewMessage;