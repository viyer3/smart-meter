import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import GoogleMapReact from 'google-map-react';
import SimpleMap from './gmr.js';
import logo from './logo.svg';
import './App.css';
import AppSidebar from './sidebar.js';

class User extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: []
		}
	}
	componentDidMount() {
		let self = this;
		const { params } = self.props.match
		//fetch('/transactions', {
		fetch('http://localhost:3003/transactions/' + params.plate, {
			method: 'GET',
			//mode: 'no-cors',
			headers: {
				"Accept": "application/json"
			}
		}).then((response) => response.json())
		.then((json) => {
			console.log(json);
			self.setState({user: json});
		}).catch(err => {
			console.log('caught it!',err);
		})
		/*fetch('http://localhost:3000/posts')
		.then(response => response.json())
		.then(posts => (this.setState({posts})))*/
	}					   
		
	createTable = () => {
		let table = []
		for (let i = 0; i < this.state.user.length; i++) {
			var cst = this.state.user[i].Cost
			table.push(<tr><td>{this.state.user[i].start_time}</td><td>&nbsp;:&nbsp;&nbsp;</td><td>${cst.toString()}</td></tr>)
		}
		return table
	}

  render() {
	const { params } = this.props.match
    return (
      <div className="App">
        <header className="App-header">
		  <p> Transactions for {params.plate}</p>
		  {this.createTable()}
        </header>
      </div>
    );
  }
}

export default User;
