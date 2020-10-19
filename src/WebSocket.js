import React, { createContext } from "react"
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { ADD_NEW_ROOM_MESSAGE } from "./redux/actions";
import { WEBSOCKET_SERVER_ENDPOINT } from "./config";

export const WebSocketContext = createContext(null)

export default ({ children }) => {
    let socket;
    let ws;
    const dispatch = useDispatch();

    const sendMessage = (message) => {
        console.log("WebSocket, sendMessage");
        socket.emit("send-message", JSON.stringify(message));
        // TODO : error handling
        dispatch({ type: ADD_NEW_ROOM_MESSAGE, data: message });
    }

    if (!socket) {
        console.log("Trying to connect to socket");
        socket = io(WEBSOCKET_SERVER_ENDPOINT);

        socket.on("connect", () => {
            console.log("WebSocketClient connected");
            // socket.send("Hello websocket is connected!");
        });

        socket.on("get-message", (msg) => {
            console.log("WebSocket GET MESSAGE");
            dispatch({ type: ADD_NEW_ROOM_MESSAGE, data: JSON.parse(msg) });
        })

        ws = {
            socket: socket,
            sendMessage
        }
    }

    return ( <
        WebSocketContext.Provider value = { ws } > { children } <
        /WebSocketContext.Provider>
    )
}