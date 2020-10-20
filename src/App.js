import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'; // add this import
import * as QueryString from "query-string"
import logo from './logo.svg';
import './App.css';
import Submission from './Components/Submission.jsx'
import SignIn from './Components/SignIn'

class App extends Component {
    constructor(props) {
        super(props);
        this.checkAuthorization = this.checkAuthorization.bind(this);
        this.modalCallbackFunction = this.modalCallbackFunction.bind(this);
        this.signInCallbackFunction = this.signInCallbackFunction.bind(this);
        this.sendAuthentication = this.sendAuthentication.bind(this);
    }

    authInfo = {
        id_token: '',
        expiry: 0
    };

    state = {
        resultMessage: "Please submit a new entry",
        sendToSignIn: false
    };

    isTokenExpired = () => {
        let ts = Math.round((new Date()).getTime() / 1000);
        console.log("Time now: " + ts + ", expiry: " + this.authInfo.expiry);
        if (ts > this.authInfo.expiry) {
            this.authInfo.id_token = '';
            return true;  //the token we have has expired, we have to go back and log in again.
        }
        return false;

    }

    checkAuthorization = () => {
        let ts = Math.round((new Date()).getTime() / 1000);
        console.log("Unix time: " + ts);
        if (this.authInfo.id_token === '') {
            let params = QueryString.parse(this.props.location.hash);
            console.log("params info: " + JSON.stringify(params))

            if (params.id_token != null) {

                this.authInfo.id_token = params.token_type + ' ' + params.id_token;
                this.authInfo.expiry = ts + parseInt(params.expires_in);

                return true;
            }
            return false;
        }
        return true;

    }

    sendAuthentication = () => {
        this.setState(
            {
                sendToSignIn: true,
            })
    }

    modalCallbackFunction = (childData) => {
        this.setState(
            {
                resultMessage: childData.resultMessage,
            })
    }
    signInCallbackFunction = (childData) => {
        this.setState(
            {
                sendToSignIn: childData,
            })
    }

    componentDidMount() {

        console.log("Component did mount")
        this.setState({
            isAuthenticated: this.checkAuthorization()
        });
    }

    render() {

        console.log("Render state: " + JSON.stringify(this.state))
        let sendToSignIn = this.state.sendToSignIn;

        if (sendToSignIn) {
            return (
                <Redirect to="/authenticate"/>
            )
        }

        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo"/>
                <div>
                    <p className={"MusicManContainerTitle"}>
                        Alexa MusicMan - Parm fixer
                    </p>
                    <p className={"MusicManContainerSubTitle"} id="MusicManSubMessage">
                        {this.state.resultMessage}
                    </p>
                </div>

                <SignIn stateData={this.state}
                            parentCallback={this.signInCallbackFunction}/>

                <Submission stateData={this.state}
                            authData={this.authInfo}
                            parentCallback={this.modalCallbackFunction}/>
            </div>
        );
    }
}


export default App;

