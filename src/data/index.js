// import React from "react";
// import { SET_CHAT_ROOMS } from "../redux/actions";
// import { useDispatch } from "react-redux";


export function fetchRooms() {

    // const dispatch = useDispatch();

    const request = {
        method: "GET",
        // header: {

        // },
        // body: JSON.stringify(params)
    };

    let promise = fetch("http://localhost:8080/api/rooms", request);
    promise.then((response) => {
        console.log("Response is" + response);
        // dispatch(SET_CHAT_ROOMS, response);
        // return { rooms: response };
    },
    ((error) => {
        console.log("Error is" + error);
        return { error: error };
    }));
}

export function fetchMessagesForRoom() {

}