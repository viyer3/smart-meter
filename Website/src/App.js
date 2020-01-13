import React, { Component } from 'react';
import SimpleMap from './SimpleMap';
import Login from './login';
import AppSidebar from './sidebar';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
		}
	}

	render() {
		return (
			<div className="App">
				{this.state.token !== null &&
				<div>
					<header className="App-header">
						<SimpleMap/>
					</header>
					<AppSidebar/>
				</div>}
				{this.state.token === null &&
					<Login token={this.state.token}/>
				}
			</div>
		);
	}
}

export default App;
