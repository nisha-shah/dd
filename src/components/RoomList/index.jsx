import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./style.css";

const stateToSelector = (state) => {
    const roomDetails = state.roomDetails,
        currentRoom = state.currentChatRoom; 
    return { roomDetails,  currentRoom };
}

function RoomList(props) {

    const { roomDetails,  currentRoom } = useSelector(stateToSelector);

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

RoomList.propTypes = {
    onRoomClick: PropTypes.func
};

export default RoomList;