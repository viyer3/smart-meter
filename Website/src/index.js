import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import User from './User';
import Balance from './Balance';
import SQLTest from './SQLTest';
import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/trans/:plate" component={User} />
			<Route path="/bal/:id" component={Balance} />
			<Route path="/test-metre" component={SQLTest} />
		</div>
	</Router>
)


ReactDOM.render(routing, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
