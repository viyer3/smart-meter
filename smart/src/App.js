import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import GoogleMapReact from 'google-map-react';
import SimpleMap from './gmr.js';
import logo from './logo.svg';
import './App.css';
import AppSidebar from './sidebar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         	<SimpleMap/>
        </header>
		<AppSidebar/>
      </div>
    );
  }
}

export default App;
