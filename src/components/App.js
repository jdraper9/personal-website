import React from 'react';

import '../styling/sass/main.scss';
import SVG from './SVG';
import Float from './Float';
import { floatDetail } from '../constants';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Toggle } from 'react-toggle-component';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomedOn: null,
      bangInitiated: false,
      darkMode: true,
    };
  }

  renderFloat = (side) => {
    if (this.state.zoomedOn !== null) {
      let floatInfo = {};
      if (this.state.zoomedOn === 'inner') {
        floatInfo = floatDetail.resourceRepo;
      } else if (this.state.zoomedOn === 'middle') {
        floatInfo = floatDetail.pathfinder;
      } else if (this.state.zoomedOn === 'outer') {
        floatInfo = floatDetail.digiiNote;
      }

      if (side === 'left') {
        return <Float side="left" info={floatInfo.left} />;
      } else if (side === 'right') {
        return <Float side="right" info={floatInfo.right} />;
      }
    } else {
      return null;
    }
  };

  renderTitle = () => {
    if (!this.state.bangInitiated) {
      return "Welcome to James' Personal Site";
    }

    // <div className="project">{this.renderTitle()}</div>
    if (this.state.zoomedOn !== null) {
      if (this.state.zoomedOn === 'inner') {
        return <div className="project">Resource Repository</div>;
      } else if (this.state.zoomedOn === 'middle') {
        return <div className="project">Pathfinder Algorithms Visualizer</div>;
      } else if (this.state.zoomedOn === 'outer') {
        return <div className="project">digiiNote</div>;
      }
    } else {
      return null;
    }
  };

  bangInfo = () => {
    this.setState({ bangInitiated: true });
  };

  getZoomedOn = (dataFromSVG) => {
    console.log(dataFromSVG);
    this.setState({ zoomedOn: dataFromSVG });
  };

  renderHeader = () => {
    if (!this.state.bangInitiated) {
      return (
        <h1 className="heading-primary" style={{ fontWeight: '100' }}>
          Hello world!
        </h1>
      );
    } else {
      return (
        <div>
          <div className="logo-container">
            <NavLink to="/personal-website" className="logo-link">
              <h1 className="heading-primary-appear">
                James <span className="title-span">Draper</span>
              </h1>
            </NavLink>
          </div>

          {this.renderTitle()}

          <ul className="navigation">
            <NavLink to="/personal-website/about" exact className="header-link">
              <li>About</li>
            </NavLink>
            <NavLink
              to="/personal-website/contact"
              exact
              className="header-link"
            >
              <li>Contact</li>
            </NavLink>
            <a
              href="https://www.linkedin.com/in/james-draper/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-linkedin fa-lg header-link header-icon"></i>
            </a>
            <a
              href="https://github.com/jdraper9"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fab fa-github fa-lg header-link header-icon"></i>
            </a>
          </ul>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Router>
          <div className="header">
            <div className="inner-header">{this.renderHeader()}</div>
          </div>
        </Router>

        <div className="spacer">&nbsp;</div>
        <main>
          <div className="grid-container">
            <div
              className={
                this.state.darkMode
                  ? 'floats col-1-of-3'
                  : 'floats-light col-1-of-3'
              }
            >
              {this.renderFloat('left')}
            </div>
            <div className="svg-wrapper col-2-of-3">
              <SVG
                getZoomedOn={this.getZoomedOn}
                bangTrue={this.bangInfo}
                darkMode={this.state.darkMode}
              />
            </div>
            <div
              className={
                this.state.darkMode
                  ? 'floats col-1-of-3 right'
                  : 'floats-light col-1-of-3 right'
              }
            >
              {this.renderFloat('right')}
            </div>
          </div>
        </main>

        <label htmlFor="toggle-1" className="light-dark">
          <Toggle
            name="toggle-1"
            width="40px"
            height="20px"
            onToggle={() => this.setState({ darkMode: !this.state.darkMode })}
          />
        </label>
      </div>
    );
  }
}

export default App;
