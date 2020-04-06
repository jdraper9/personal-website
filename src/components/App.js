import React from 'react';
import '../styling/App.css';
import SVG from './SVG.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="header">Hello</h1>
        <div className="wrapper">
          <SVG />
        </div>
      </div>
    );
  }
}

export default App;
