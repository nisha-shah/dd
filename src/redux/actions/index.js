export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_CHAT_ROOMS = "SET_CHAT_ROOMS";
export const SELECTED_CHAT_ROOM = "SELECTED_CHAT_ROOM";
export const SET_CHAT_ROOM_MESSAGES = "SET_CHAT_ROOM_MESSAGES";
export const ADD_NEW_MESSAGE_TO_CHAT_ROOM = "ADD_NEW_MESSAGE_TO_CHAT_ROOM";

//
export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG";
//

export const actionCreator = (type, data) => {
    return {
        type,
        data
    };
}