import React, { createContext } from 'react'
import io from 'socket.io-client';
// import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';

const WebSocketContext = createContext(null)
const WS_BASE = "http://localhost:8000";
export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let ws;
    const dispatch = useDispatch();

    const sendMessage = (message, callback) => {
        console.log("WebSocket --> SEND MESSAGE" + JSON.stringify(message));
        socket.emit("send-message", JSON.stringify(message));
        // TODO : on success , call callback : add on failure callBack
        callback(message);
        // dispatch(updateChatLog(payload));
        // dispatch({type: ADD_NEW_MESSAGE_TO_CHAT_ROOM, newChatMessage: message.message});
    }

    if (!socket) {
        console.log("Trying to connect to socket");
        socket = io("http://localhost:8000");

        socket.on("connect", () => {
            // either with send()
            console.log("WebSocket Client --> Connected");
            socket.send("Hello websocket is connected!");

            // or with emit() and custom event names
            // socket.emit('salutations', 'Hello!', { 'mr': 'john' }, Uint8Array.from([1, 2, 3, 4]));
        });

        socket.on("chat-message", (msg) => {
            console.log("WebSocket --> GET MESSAGE");
            // const payload = JSON.parse(msg);
            // // dispatch(updateChatLog(payload));
            // dispatch({type: UPDATE_CHAT_LOG, data: payload});
        })

        ws = {
            socket: socket,
            sendMessage
        }
    }


    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}