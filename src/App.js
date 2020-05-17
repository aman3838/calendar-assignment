import React, { Component } from 'react';
import Calendar from './Calendar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App font-sans bg-gray-200 p-20 md:p-8 sm:p-1">
        <Calendar />
      </div>
    );
  } 
}

export default App;
