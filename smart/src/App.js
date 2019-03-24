import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SimpleMap from './gmr.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SimpleMap/>
        </header>
      </div>
    );
  }
}

export default App;
