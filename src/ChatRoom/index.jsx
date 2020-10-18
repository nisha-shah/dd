import React from 'react';
import UserDetails from "../UserDetails";
import RoomList from "../RoomList";
import MessageList from "../MessageList";
import ChatHeader from "../ChatHeader";
import NewMessage from "../NewMessage";
// import { fetchRooms } from "../data";
import "./styles.css";
import { connect } from "react-redux";
import { SET_CHAT_ROOMS, SELECTED_CHAT_ROOM, SET_CHAT_ROOM_MESSAGES, ADD_NEW_MESSAGE_TO_CHAT_ROOM } from '../redux/actions';

// const ws = useContext(WebSocketContext);

class ChatRoom extends React.Component {


    // constructor(props) {
    //     super(props);
    //     // this.ws = useContext(WebSocketContext);
    // }

    componentDidMount() {
        console.log("In Component did mount");
        fetch('http://localhost:8080/api/rooms').then((result)=>result.json().then((data)=>{
            // push topics into this.state.topics somehow
            this.props.setRooms(data);
        }));
    }

    handleChatRoomClick = (roomId) => {
        console.log("handleChatRoomClick , Selected room id is " + roomId);
        fetch(`http://localhost:8080/api/rooms/${roomId}`).then((result)=>result.json().then((data)=>{
            // push topics into this.state.topics somehow
            this.props.selectChatRoom(data);
        }));

        fetch(`http://localhost:8080/api/rooms/${roomId}/messages`).then((result)=>result.json().then((data)=>{
            // push topics into this.state.topics somehow
            this.props.setMessagesInChatRoom(data);
        }));
    }

    handleSendNewMessage = (newMessage) => {
        console.log("Handle Send Message" + JSON.stringify(newMessage));
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMessage)
        };

        
        fetch(`http://localhost:8080/api/rooms/${newMessage.roomId}/messages`, request).then((result)=>result.json().then((data)=>{
            // push topics into this.state.topics somehow
            // this.props.addNewMessageToRoom(newMessage);
        }));
    }

    render() {
        return (
            <div className="chat-room" style ={{ height: "100%", width: "100%", position: "absolute"}}> 
                <div className="left-bar">
                    <div className="user-details">
                        <UserDetails userDetails={this.props.userDetails}/>
                    </div>
                    <div className="rooms-list">
                        <RoomList onRoomClick={this.handleChatRoomClick}/>
                    </div>
                </div>
                <div className="right-bar" >
                    <div className="room-details">
                        <ChatHeader />
                    </div>
                    <div className="room-messages">
                        <MessageList />
                    </div>
                    <div className="new-message">
                        <NewMessage onSendMessage={this.handleSendNewMessage}/>
                    </div>
                </div>
            </div>

        );
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      setRooms: (allRooms) => dispatch({ type: SET_CHAT_ROOMS, data: { rooms: allRooms}}),
      selectChatRoom: (chatRoom) => dispatch({ type: SELECTED_CHAT_ROOM, data: { selectedRoom: chatRoom}}),
      setMessagesInChatRoom: (messages) => dispatch({type: SET_CHAT_ROOM_MESSAGES, data: { chatMessagesForRoom: messages }}),
      addNewMessageToRoom: (newMessage) => dispatch({ type: ADD_NEW_MESSAGE_TO_CHAT_ROOM, data: { newChatMessage: newMessage}})
    }
  }
  
  export default connect(null, mapDispatchToProps)(ChatRoom);

//   <div className="main" style ={{ height: "100%", width: "100%", position: "absolute"}}> 
//             <div className="left" style ={{ float: "left", height: "100%", width: "20%", backgroundColor: "yellow"}}>
//                 <div className="l1" style={{ height: "30%", borderBottom: "2px solid black"}}>Left 1</div>
//                 <div className="l2">Left 2</div>
//             </div>
//             <div className="right" style ={{ float: "left", height: "100%", width: "80%", backgroundColor: "pink"}}>
//                 <div className="r1" style={{ height: "10%", borderBottom: "2px solid black"}}>Right 1</div>
//                 <div className="r2" style={{ height: "70%", borderBottom: "2px solid black"}}>Right 2</div>
//                 <div className="r3" style={{ height: "20%", borderBottom: "2px solid black"}}>Right 3</div>
//             </div>
//         </div>