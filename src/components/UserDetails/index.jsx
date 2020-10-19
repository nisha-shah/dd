import React from "react";
import UserSession from "./UserSession";
import "./styles.css";

function UserDetails(props) {
    return (
        <div className="chat-user-details">
            <div className="user-name">{props.userDetails.name}</div>
            <UserSession sessionInTime={props.userDetails.sessionStartTime} />
        </div>
    );
}

export default UserDetails;