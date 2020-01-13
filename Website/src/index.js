import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import login from './login';
import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/test-metre" component={login} />
		</div>
	</Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
