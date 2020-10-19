import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/Store";
import ChatApp from "../ChatApp";
import WebSocketProvider from "../../WebSocket";


function App() {

    return (
        <Provider store={store}>
            <WebSocketProvider>
                <ChatApp />
            </WebSocketProvider>
        </Provider>
    );
}

export default App;
