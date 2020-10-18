import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WebSocketContext } from '../WebSocket';
import { ADD_NEW_MESSAGE_TO_CHAT_ROOM } from "../redux/actions";

function NewMessage(props) {

    // const idRef = useRef();
    const selectedChatRoom = useSelector(state => state.selectedChatRoom);
    const userDetails = useSelector(state => state.userDetails);
    const [newMessage, setNewMessage] = useState("");
    
    const ws = useContext(WebSocketContext);
    const dispatch = useDispatch();


    const handleSendNewMessage = () => {
        // console.log("In send message" + idRef.current.value);
        const message = {
            name: userDetails.name,
            message: newMessage,
            // idRef.current.value,
            reaction: null,
            roomId: selectedChatRoom.id
        }
        props.onSendMessage(message);
        setNewMessage("");
    }

    const dispatchNewMessage = (message) => {
        // update state 
        dispatch({type: ADD_NEW_MESSAGE_TO_CHAT_ROOM, data: { newChatMessage: message}});
        props.onSendMessage(message);
        setNewMessage("");
    }

    const handleNewSendMessage1 = () => {
        const message = {
            name: userDetails.name,
            message: newMessage,
            // idRef.current.value,
            reaction: null,
            roomId: selectedChatRoom.id
        };
        //
        ws.sendMessage(message, dispatchNewMessage);
        //
    }

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }

    return (
        <div className="new-message" style={{ margin: "24px" }}>
            <input type="text" placeholder="Type your message..." onChange={handleNewMessageChange} value={newMessage} style={{ width: "90%", }} />
            <button style={{ backgroundColor: "#ff0000", marginLeft: "20px" }} onClick={handleNewSendMessage1}>Send</button>
        </div>
    );
}

export default NewMessage;