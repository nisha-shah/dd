const reducer = (state = {}, action) => {
    const { type, data } = action;
    switch (type) {
        case "SET_USER_DETAILS":
            return { ...state, userDetails: { name: data.userName, sessionStartTime: data.loggedInTime } };
        case "SET_CHAT_ROOMS":
            return { ...state, chatRooms: data.rooms };
        case "SELECTED_CHAT_ROOM":
            return { ...state, selectedChatRoom: data.selectedRoom };
        case "SET_CHAT_ROOM_MESSAGES":
            // return Object.assign( {}, state, { selectedChatRoom: { messages: data.chatMessagesForRoom}});
            return Object.assign({}, state, { selectedChatRoom: { ...state.selectedChatRoom, messages: data.chatMessagesForRoom } });
        case "ADD_NEW_MESSAGE_TO_CHAT_ROOM": {
            let updatedMessages = state.selectedChatRoom.messages || [];
            updatedMessages.push(data.newChatMessage);
            console.log("totalMessages" + updatedMessages.length);
            return Object.assign({}, state, { selectedChatRoom: { ...state.selectedChatRoom, messages: updatedMessages } });
            // let updatedMessages =  state.selectedChatRoom.messages ? [ ...state.selectedChatRoom.messages, data.newChatMessage] : [data.newChatMessage] ;
            // return Object.assign({}, state, {selectedChatRoom : { ...state.selectedChatRoom , messages: updatedMessages }});
        }

        case "UPDATE_CHAT_LOG":
            if (state.selectedChatRoom.id !== null && data.roomId === state.selectedChatRoom.id) {
                // state.chatLog = [...state.chatLog, action.update.data];
                let updatedMessages = state.selectedChatRoom.messages || [];
                updatedMessages.push(data.data);
                console.log("totalMessages" + updatedMessages.length);
                return Object.assign({}, state, { selectedChatRoom: { ...state.selectedChatRoom, messages: updatedMessages } });
            }
            break;

        // case "HIDE_MODAL": return {...state, showModal: false };
        // case "SAVE_NEW_RECORDED_TASK": return Object.assign({}, state, {recordedTasks: [data, ...state.recordedTasks]});
        // case "ADD_TO_CURRENT_RECORDING": return {...state, currentTaskRecording: data }
        default: return state
    }
}
export default reducer;