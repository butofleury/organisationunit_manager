import React, { Component } from 'react';
import './App.css';
import Orgunits_list from './orgunits_list.js'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUnits_list : []
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    );
  }
}

export default App;
