import React from "react";
import "./styles.css";

class UserSession extends React.Component {

    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            time: date.toLocaleString()
        };
    }

    componentDidMount() {
        setInterval(
            () => this.tick(), 5000
        );
    }

    tick() {
        let date = new Date();
        let timeDiff = (this.props.sessionInTime - date.getTime()) / 1000;
        timeDiff /= 60;
        this.setState({
            time: Math.abs(Math.round(timeDiff))
        });
    }

    render() {
        return (
        <div className="user-active-since" style = {{ fontWeight: "300"}}>
            Online for {this.state.time} mins
        </div>
        );
    }
}
export default UserSession;