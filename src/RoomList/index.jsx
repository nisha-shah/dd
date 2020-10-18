import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

function RoomList(props) {

    const roomList = useSelector(state => state.chatRooms);
    const currentRoom = useSelector(state => state.selectedChatRoom);
    
    return (
        <div className="room-list" style ={{ height: "90%", width: "100%"}}> 
            {roomList.map((room) => {
                const activeRoomClass = currentRoom.id === room.id ? "current-room" : "";
                return (<div key={room.id} onClick={() => props.onRoomClick(room.id)} className= {"room-name " + activeRoomClass}>
                    {room.name}
                </div>)})
            }
        </div>  
    );
}

export default RoomList;