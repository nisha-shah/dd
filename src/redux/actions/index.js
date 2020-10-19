export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_CHAT_ROOMS = "SET_CHAT_ROOMS";
export const UPDATE_ROOM_DETAILS = "UPDATE_ROOM_DETAILS";
export const SET_ROOM_MESSAGES = "SET_ROOM_MESSAGES";
export const SET_CURRENT_CHAT_ROOM = "SET_CURRENT_CHAT_ROOM";
export const ADD_NEW_ROOM_MESSAGE = "ADD_NEW_ROOM_MESSAGE";
export const actionCreator = (type, data) => {
    return {
        type,
        data
    };
}