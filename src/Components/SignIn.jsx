import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import './SignIn.css';


class SignIn extends Component {
    constructor(props) {
        super(props);

        this.handleSendToAuthenticate = this.handleSendToAuthenticate.bind(this);

    }

    handleSendToAuthenticate = () => {
        this.props.parentCallback(true);
    }

    render() {
        console.log("Inside SignIn: " + JSON.stringify(this.props.stateData))
        if (!this.props.stateData.isAuthenticated) {
            return (
                <div>
                    <Button variant="secondary" className={"mySignInButton"} onClick={this.handleSendToAuthenticate}>
                        Sign In
                    </Button>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default SignIn;
