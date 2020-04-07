import React from 'react';
import '../styling/App.css';
import Home from './Home.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="header">Hello</h1>
        <div className="wrapper">
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
