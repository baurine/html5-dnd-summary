import React, { Component } from 'react';
import './App.css';
import Draggable from './Draggable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="title">React Drag and Drop Event</h2>
        <div className="App-body">
          <Draggable/>
        </div>
      </div>
    );
  }
}

export default App;
