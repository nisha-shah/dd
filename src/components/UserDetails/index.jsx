import React from "react";
import PropTypes from "prop-types";
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

UserDetails.propTypes = {
    userDetails: PropTypes.object
};

export default UserDetails;