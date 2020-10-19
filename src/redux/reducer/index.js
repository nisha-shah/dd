const reducer = (state = {}, action) => {
    const { type, data } = action;
    switch (type) {

        case "SET_USER_DETAILS":
            return { ...state, userDetails: { name: data.userName, sessionStartTime: data.loggedInTime } };

        case "SET_CHAT_ROOMS":
            return { ...state, roomDetails: data };

        case "UPDATE_ROOM_DETAILS":
            let existingroomDetails = Object.assign({}, state.roomDetails);
            existingroomDetails[data.id].users = data.users;
            existingroomDetails[data.id].roomDetailsFetched = true;
            return { ...state, roomDetails: existingroomDetails };

        case "SET_CURRENT_CHAT_ROOM":
            let currentMessages = Object.assign([], state.roomMessages[data.id]);
            return { ...state, currentChatRoom: data, currentChatMessages: currentMessages };

        case "SET_ROOM_MESSAGES":
            let roomMessages = Object.assign({}, state.roomMessages);
            roomMessages[data.roomId] = data.messages;
            return { ...state, roomMessages: roomMessages };

        case "ADD_NEW_ROOM_MESSAGE":
            console.log("in ADD NEW ROOM MESSAGE" + data);
            let roomId = data.roomId;
            let messagesForRoom = Object.assign([], state.roomMessages[roomId]);
            messagesForRoom.push(data);
            let newRoomMessages = state.roomMessages;
            newRoomMessages[roomId] = messagesForRoom;

            let newCurrentChatMessages = Object.assign([], state.currentChatMessages);
            if (state.currentChatRoom.id === roomId) {
                newCurrentChatMessages.push(data)
            }
            // if user not in room's user list, add them
            let roomDetails = Object.assign({}, state.roomDetails);
            if (roomDetails[roomId] && !roomDetails[roomId].users.includes(data.name)) {
                roomDetails[roomId].users.push(data.name);
            }
            return { ...state, roomMessages: newRoomMessages, currentChatMessages: newCurrentChatMessages, roomDetails: roomDetails };

        default: return state
    }
}
export default reducer;