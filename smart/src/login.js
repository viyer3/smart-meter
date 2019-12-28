import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import GoogleMapReact from 'google-map-react';
import SimpleMap from './gmr.js';
import base64 from 'base-64';
import logo from './logo.svg';
import './App.css';
import AppSidebar from './sidebar.js';

class Balance extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sessid: "",
			user: "",
			password: "",
		}

		this.doFetch = this.doFetch.bind(this);
		this.doLogin = this.doLogin.bind(this);
	}
	
	componentDidMount() {}
	
	doFetch() {
		const { params } = this.props.match
		fetch(`http://${window.location.hostname}:3003/test/`, {
			method: 'GET',
			//mode: 'no-cors',
			headers: new Headers({
				"Accept": "application/json",
				"Authorization": `Basic ${base64.encode(`${this.state.user}:${this.state.password}`)}`
			})
		}).then(response => response.json())
		.then((json) => {
			console.log(json);
			this.setState({user: json[0]});
		}).catch(err => {
			console.log('caught it!',err);
		})
	}					   

	doLogin = () => {
		console.log("going");
		fetch(`http://${window.location.hostname}:3003/sess`, {
			method: 'GET',
			headers: {
				"Accept": "application/json",
				"Authorization": `Basic ${base64.encode(`${this.state.user}:${this.state.password}`)}`
			},
		})
		//.then(res => res.json())
		.then(res => res.text())
		.then(res => {
			this.setState({sessid: res})
			//create session cookie
		})
		.catch(err => console.log(err))
	}

	render() {
	return (
		<div className="App">
			<header className="App-header">
				{/*this.state.user === undefined &&*/}
				{true &&
					<div>
						<h1>Login, you filthy animal</h1>
						<input 
							type="text" 
							placeholder="username" 
							id="username" 
							value={this.state.user} 
							onChange={_ => this.setState({user:_.target.value})}
						></input>
						<br/>
						<input 
							type="password" 
							id="password"
							value={this.state.password}
							onChange={_ => this.setState({password:_.target.value})}
						></input>
						<br/>
						<button onClick={this.doLogin}>yeet</button>
					</div>
				}
				{/*this.state.user !== undefined && <SimpleMap/>*/}
				{this.state.sessid}
			</header>
			{/*this.state.user !== undefined && <QSidebar name={this.state.user['fname']} bal={-1}/>*/}
		</div>
	);
	}
}

export default Balance;
