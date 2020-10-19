import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./styles.css";

const stateToSelector = (state) => {
    const currentChatRoom = state.currentChatRoom,
        userDetails = state.userDetails;
    return ({ currentChatRoom, userDetails });
};

function NewMessage(props) {

    const { currentChatRoom, userDetails } = useSelector(stateToSelector);
    const [newMessage, setNewMessage] = useState("");

    const handleSendButtonClick = () => {
        if (newMessage !== "") {
            const message = {
                name: userDetails.name,
                message: newMessage,
                reaction: null,
                roomId: currentChatRoom.id
            };
            props.onSendMessage(message);
            setNewMessage("");
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