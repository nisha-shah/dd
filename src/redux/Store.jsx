import {createStore} from "redux";
import reducer from "./reducer";

let initialState = {
    userDetails: {},
    roomDetails: {},
    roomMessages: {},
    currentChatRoom: {},
    currentChatMessages: []
};

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);