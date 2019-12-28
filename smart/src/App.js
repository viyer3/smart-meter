import React, { Component } from 'react';
import SimpleMap from './SimpleMap';
import AppSidebar from './sidebar';
import './App.css';

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
