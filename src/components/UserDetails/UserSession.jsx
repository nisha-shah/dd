import React from "react";
import "./styles.css";

class UserSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: 0
        };
    }

    componentDidMount() {
        setInterval(
            () => this.tick(), 30000
        );
    }

    tick() {
        let date = new Date();
        let timeDiff = (this.props.sessionInTime - date.getTime()) / 60000;
        this.setState({
            elapsedTime: Math.abs(Math.round(timeDiff))
        });
    }

    render() {
        return (
            <div className="user-active-since">
                Online for {this.state.elapsedTime}  {this.state.elapsedTime == 1 ? "minute" : "minutes"}
            </div>
        );
    }
}
export default UserSession;