import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import GoogleMapReact from 'google-map-react';
import SimpleMap from './gmr.js';
import logo from './logo.svg';
import './App.css';
import AppSidebar from './sidebar.js';

class Balance extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: []
		}
	}
	componentDidMount() {
		let self = this;
		console.log(JSON.stringify(window.location.hostname));
		const { params } = self.props.match
		fetch(`http://${window.location.hostname}:3003/test/`, {
			method: 'GET',
			//mode: 'no-cors',
			headers: {
				"Accept": "application/json"
			}
		}).then((response) => response.json())
		.then((json) => {
			console.log(json);
			self.setState({user: json[0]});
		}).catch(err => {
			console.log('caught it!',err);
		})
	}					   


  render() {
    return (
      <div className="App">
        <header className="App-header">
		  <SimpleMap/>
        </header>
		<QSidebar name={this.state.user['fname']} bal={-1}/>
      </div>
    );
  }
}
	function QSidebar(props){
	return (
		<SideNav
			onSelect={(selected) => {
				//Add your code here
			}}
		>
		<SideNav.Toggle />
			<SideNav.Nav defaultSelected="home">


				<NavItem eventkey="User">
					<NavIcon>
						<i className="fa fa-fw fa-pencil-square-o" style={{ fontSize: '1.75em' }} />
					</NavIcon>
					<NavText>
						<b>{props.name}</b>
					</NavText>
				</NavItem>

				<NavItem eventkey="Bal">
					<NavIcon>
						<i className="fa fa-fw fa-money" style={{ fontSize: '1.75em' }} />
					</NavIcon>
					<NavText>
						<i>${props.bal}</i>
					</NavText>
				</NavItem>
				
				<NavItem eventKey="home">
					<NavIcon>
						<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
					</NavIcon>
					<NavText>
						Home
					</NavText>
				</NavItem>
	
				<NavItem eventKey="charts">
					<NavIcon>
						<i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
					</NavIcon>
					<NavText>
						Charts
					</NavText>

					<NavItem eventKey="charts/linechart">
						<NavText>
							Line Chart
						</NavText>
					</NavItem>

					<NavItem eventKey="charts/barchart">
						<NavText>
							Bar Chart
						</NavText>
					</NavItem>
				</NavItem>
			</SideNav.Nav>
		</SideNav>
	);	
	}

export default Balance;
