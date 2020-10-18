import React from 'react';
// import './App.css';
// import Login from "./Login";
// import ChatRoom from "./ChatRoom";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
// import { useSelector } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import ChatApp from './ChatApp';
import WebSocketProvider from "./WebSocket";


function App() {

  // const userName = useSelector(state => state.userDetails.userName);
  // const [id, setId] = useState();
  return (
    <Provider store={ store }>
        <WebSocketProvider>
          <ChatApp />
        </WebSocketProvider>
      </Provider>
  );
}

export default App;
