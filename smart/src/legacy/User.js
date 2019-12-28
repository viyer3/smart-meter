import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import GoogleMapReact from 'google-map-react';
import SimpleMap from './gmr.js';
import logo from './logo.svg';
import './App.css';
import AppSidebar from './sidebar.js';
import base64 from 'base-64';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderState: 0,
			error: "",
			transactionTable: [],
		}
	}

	componentDidMount() {
		var login = "smart@meter.com";
		var password = "metre";
		const { params } = this.props.match;

		this.setState({renderState: 1});

		//fetch(`http://${window.location.hostname}:3003/trans/` + params.plate, {
		fetch(`http://localhost:3003/trans/` + params.plate, {
			method: 'GET',
			//mode: 'no-cors',
			headers: new Headers({
				"Accept": "application/json",
				"Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
			})
		})
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			this.setState({
				//Loaded
				renderState : 2,
				transactionTable: this.createTable(json)
			});
		})
		.catch(err => {
			console.log('caught it!',err);
			this.setState({
				renderState: -1,
				error: err.message
			});
		})
	}					   
		
	createTable = (data) => {
		let table = [];
		console.log(data);
		for (let i = 0; i < data.length; i++) {
			var cst = data[i].Cost;
			table.push(<div>{data[i].start_datetime}: ${cst.toString()}</div>)
		}
		return table;
	}

	render() {
		const { params } = this.props.match
		return (
			<header className="App-header">
				<div className="App">
					<p> Transactions for {params.plate}</p>
					{this.state.renderState === -1	&& `An error occured: ${this.state.error}`}
		  			{this.state.renderState === 1 	&& "Loading"}
		  			{this.state.renderState === 2 	&& this.state.transactionTable}
      				</div>
        		</header>
    		);
  	}
}

export default User;
