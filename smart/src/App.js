import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import logo from './logo.svg';
import './App.css';
import AppSidebar from './sidebar.js';

class App extends Component {
  render() {
    return (
		<div className="App">
        	<header className="App-header">
          		<img src={logo} className="App-logo" alt="logo" />
          		<p>
          			Edit <code>src/App.js</code> and save to reload.
					Hello!
          		</p>
          		<a
            		className="App-link"
            		href="https://reactjs.org"
            		target="_blank"
            		rel="noopener noreferrer"
          		>
            		Learn React
          		</a>
       		 </header>

		<AppSidebar/>

		</div>
    );
  }
}

export default App;
