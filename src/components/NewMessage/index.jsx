import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { WebSocketContext } from "../../WebSocket";
import { ADD_NEW_ROOM_MESSAGE } from "../../redux/actions";
import "./styles.css";

const stateToSelector = (state) => {
    const currentChatRoom = state.currentChatRoom,
        userDetails = state.userDetails;
    return ({ currentChatRoom, userDetails });
};

function NewMessage(props) {

    const { currentChatRoom, userDetails } = useSelector(stateToSelector);
    const [newMessage, setNewMessage] = useState("");

    const ws = useContext(WebSocketContext);
    const dispatch = useDispatch();

    const dispatchNewMessage = (message) => {
        dispatch({ type: ADD_NEW_ROOM_MESSAGE, data: message });
        props.onSendMessage(message);
        setNewMessage("");
    }

    const handleSendButtonClick = () => {
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

    const handleKeypress = event => {
        // triggers by pressing the enter key
        if (event.keyCode === 13) {
            handleSendButtonClick();
        }
    }

    return (
        <div className="new-message">
            <input type="text" placeholder="Type your message..." onChange={handleNewMessageChange} onKeyDown={handleKeypress} value={newMessage} className="input-chat-box" />
            <button className="btn-send" onClick={handleSendButtonClick}>Send</button>
        </div>
    );
}

NewMessage.propTypes = {
    onSendMessage: PropTypes.func
}

export default NewMessage;