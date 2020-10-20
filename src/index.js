import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={App} />
        <Route path='/authenticate' component={() => {
            window.location.href = 'https://musicmanparmfixer.auth.us-east-1.amazoncognito.com/login?client_id=7ammhdth9itfqsf839j987i9h8&response_type=token&scope=email+openid&redirect_uri=http://localhost:3000';
            return null;
        }}/>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
