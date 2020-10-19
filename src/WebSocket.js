import React, { createContext } from "react"
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { ADD_NEW_ROOM_MESSAGE } from "./redux/actions";

export const WebSocketContext = createContext(null)

export default ({ children }) => {
    let socket;
    let ws;
    const dispatch = useDispatch();

    const sendMessage = (message, callback) => {
        console.log("WebSocket --> SEND MESSAGE" + JSON.stringify(message));
        socket.emit("send-message", JSON.stringify(message));
        // TODO : on success , call callback : add on failure callBack
        callback(message);
    }

    if (!socket) {
        console.log("Trying to connect to socket");
        socket = io("http://localhost:8000");

        socket.on("connect", () => {
            console.log("WebSocket Client --> Connected");
            // socket.send("Hello websocket is connected!");
        });

        socket.on("get-message", (msg) => {
            console.log("WebSocket --> GET MESSAGE" + msg);
            dispatch({ type: ADD_NEW_ROOM_MESSAGE, data: JSON.parse(msg) });
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

