import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

function RoomList(props) {

    const roomDetails = useSelector(state => state.roomDetails);
    const currentRoom = useSelector(state => state.currentChatRoom);

    let roomDivs = []
    for (let roomId in roomDetails) {
        const room = roomDetails[roomId];
        const activeRoomClass = currentRoom.id === room.id ? "current-room" : "";
        const roomElement = <div key={room.id} onClick={() => props.onRoomClick(room.id)} className={"room-name " + activeRoomClass}>
                {room.name}
            </div>;
        roomDivs.push(roomElement);
    }

    return (
        <div className="rooms-list">
            {roomDivs}
        </div>
    );
}

export default RoomList;