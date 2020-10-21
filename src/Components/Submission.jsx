import React, {Component} from 'react';
import './Submission.css';

class Submission extends Component {
    constructor(props) {
        super(props);

        this.updateDB = this.updateDB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInvalidParmChange = this.handleInvalidParmChange.bind(this);
        this.handleValidParmChange = this.handleValidParmChange.bind(this);

        this.state = {value1: '', value2: '', id_token: this.props.authData.id_token};

    }

    handleInvalidParmChange(event) {
        this.setState({value1: event.target.value});
    }

    handleValidParmChange(event) {
        this.setState({value2: event.target.value});
    }

    handleSubmit(event) {

        if (this.state.value1 === '' || this.state.value2 === '') {
            alert('Missing at least one of the Key/Values');
        } else {
            this.updateDB(this.state.value1, this.state.value2)
        }
         event.preventDefault();
    }

    updateParent = (value, message) => {
        console.log("isOpen: " + value + ", message: " + message)
        var submissionData = {
            resultMessage: (message === '') ? this.props.stateData.resultMessage : message,
            isOpen: value
        }
        this.props.parentCallback(submissionData);
    }

      updateDB = (strkey, strvalue) => {
        console.log("Inside updateDB")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.authData.id_token
            },
            body: JSON.stringify({
                SongKickInvalidParm: strkey,
                SongKickValidParm: strvalue
            })
        };

         console.log("performing remote API fetch")
        fetch(process.env.REACT_APP_PARMDATA_API_URL, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    console.log("error response: " + data.message)
                    const error = data.message;
                    return Promise.reject(error);
                }
                this.updateParent(true, data.message)
            })
            .catch(error => {
                this.updateParent(true, "An Error occurred: " + error)
            });
    }

    render() {
        console.log("Inside Submission: " + JSON.stringify(this.props.stateData))
        if (this.props.stateData.isAuthenticated) {
            return (

                <div className={"divContainer"}>
                         <div className={"MusicManMainContainer"}>
                            <form >
                                <div className="ParmDiv">
                                    <label>
                                        Invalid Parm:
                                        <br/>
                                        <input type="text" value={this.state.value1} className={"textEntry"}
                                               onChange={this.handleInvalidParmChange}/>
                                    </label>
                                </div>
                                <div className="ParmDiv">
                                    <label>
                                        Corrected Parm:
                                        <br/>
                                        <input type="text" value={this.state.value2} className={"textEntry"}
                                               onChange={this.handleValidParmChange}/>
                                    </label>
                                </div>
                                <input type="submit" className="myButton" value="Submit the correction"
                                       onClick={this.handleSubmit}/>
                            </form>
                        </div>
                 </div>
            );
        } else {
            return null;
        }
    }
}


export default Submission;
