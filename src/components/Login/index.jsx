import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { SET_USER_DETAILS } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Login() {

    const idRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: SET_USER_DETAILS, data: { userName: idRef.current.value, loggedInTime: new Date().getTime() } });
    }

    return (
        <Container className="align-items-center d-flex" style={{ height: "100vh" }}>
            <Form className="w-100">
                <Form.Group>
                    <Form.Control type="text" placeholder="Type your username..." ref={idRef} required></Form.Control>
                </Form.Group>
                <Button type="submit" style={{ backgroundColor: "#ff0000" }} onClick={handleSubmit}> Join the DoorDash Chat</Button>
            </Form>
        </Container>
    );
}

export default Login;