import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserDetails from "../UserDetails";
import RoomList from "../RoomList";
import MessageList from "../MessageList";
import ChatHeader from "../ChatHeader";
import NewMessage from "../NewMessage";
import { SET_CHAT_ROOMS, UPDATE_ROOM_DETAILS, SET_CURRENT_CHAT_ROOM, SET_ROOM_MESSAGES } from "../../redux/actions";
import { SERVER_API_GET_ROOMS_ENDPOINT } from "../../config";
import "./styles.css";
import { WebSocketContext } from "../../WebSocket";


class ChatRoom extends React.Component {

    static propTypes = {
        userDetails: PropTypes.object,
        roomDetails: PropTypes.object,
        setRooms: PropTypes.func,
        updateRoomDetails: PropTypes.func,
        setCurrentChatRoom: PropTypes.func,
        setRoomMessages: PropTypes.func
    }

    static contextType = WebSocketContext;

    componentDidMount() {
        // get all available rooms from server
        fetch(SERVER_API_GET_ROOMS_ENDPOINT).then((result) => result.json().then((data) => {
            let chatRooms = {};
            data.forEach((room) => {
                let newRoom = {
                    id: room.id,
                    name: room.name,
                    users: [],
                    roomDetailsFetched: false,
                    hasUnreadMessages: false
                };
                chatRooms[room.id] = newRoom;
            });
            this.props.setRooms(chatRooms);

            // setting first room as the default during first load
            if (data && data.length > 0) {
                this.handleChatRoomClick(data[0].id);
            }
        }));
    }

    handleChatRoomClick = (roomId) => {
        // room details and existing messages of that room 
        // are fetched from server only during the first click
        // consequently, they are managed clientside via websockets
        if (!this.props.roomDetails[roomId].roomDetailsFetched) {
            fetch(`${SERVER_API_GET_ROOMS_ENDPOINT}/${roomId}`)
                .then((result) => result.json()
                    .then((roomDetails) => {
                        this.props.updateRoomDetails(roomDetails);
                        // once room details are fetched, now fetch messages of that room
                        fetch(`${SERVER_API_GET_ROOMS_ENDPOINT}/${roomId}/messages`)
                            .then((result) => result.json()
                                .then((roomMesages) => {
                                    this.props.setRoomMessages(roomId, roomMesages);
                                    this.props.setCurrentChatRoom(this.props.roomDetails[roomId]);
                                }));
                    }));
        } else {
            this.props.setCurrentChatRoom(this.props.roomDetails[roomId]);
        }
    }

    handleSendNewMessage = (newMessage) => {
        let ws = this.ws;
        // write the new message to server before broadcasting it to other users
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMessage)
        };

        fetch(`${SERVER_API_GET_ROOMS_ENDPOINT}/${newMessage.roomId}/messages`, request)
            .then((result) => result.json()
                .then((data) => {
                    // TODO: handle errors
                    console.log("New Message persisted");
                    this.context.sendMessage(newMessage);
                }));
    }

    render() {
        return (
            <div className="chat-room">
                <div className="user-details">
                    <UserDetails userDetails={this.props.userDetails} />
                </div>
                <div className="rooms-list">
                    <RoomList onRoomClick={this.handleChatRoomClick} />
                </div>
                <div className="room-details">
                    <ChatHeader />
                </div>
                <div className="room-messages">
                    <MessageList />
                </div>
                <div className="new-chat-message">
                    <NewMessage onSendMessage={this.handleSendNewMessage} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRooms: (chatRooms) => dispatch({ type: SET_CHAT_ROOMS, data: chatRooms }),
        updateRoomDetails: (roomDetails) => dispatch({ type: UPDATE_ROOM_DETAILS, data: roomDetails }),
        setCurrentChatRoom: (selectedChatRoom) => dispatch({ type: SET_CURRENT_CHAT_ROOM, data: selectedChatRoom }),
        setRoomMessages: (roomId, messages) => dispatch({ type: SET_ROOM_MESSAGES, data: { roomId: roomId, messages: messages } }),
    }
}

const mapStateToProps = (state) => {
    const { roomDetails } = state;
    return { roomDetails: roomDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);