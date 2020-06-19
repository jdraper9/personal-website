import React from 'react';

import '../styling/sass/main.scss';
import SVG from './SVG';
import Float from './Float';
import { floatDetail } from '../constants';
import MediaQuery from 'react-responsive';

import About from './About';
import Contact from './Contact';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import { Toggle } from 'react-toggle-component';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomedOn: null,
      bangInitiated: false,
      darkMode: true,
      onHomePage: true,
      sideDrawerOpen: false,
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
        return (
          <Float
            darkMode={this.state.darkMode}
            side="left"
            info={floatInfo.left}
            selected={this.state.zoomedOn}
            updatePageCallback={this.updatePageChange}
          />
        );
      } else if (side === 'right') {
        return (
          <Float
            darkMode={this.state.darkMode}
            side="right"
            info={floatInfo.right}
            selected={this.state.zoomedOn}
            updatePageCallback={this.updatePageChange}
          />
        );
      }
    } else {
      return null;
    }
  };

  renderTitle = () => {
    if (!this.state.bangInitiated) {
      return "Welcome to James' Personal Site";
    }

    if (this.state.zoomedOn !== null) {
      if (this.state.zoomedOn === 'inner') {
        return <div className="project">Resource Repository</div>;
      } else if (this.state.zoomedOn === 'middle') {
        return <div className="project">Pathfinder Algorithms Visualizer</div>;
      } else if (this.state.zoomedOn === 'outer') {
        return <div className="project">digiiNote</div>;
      }
    } else {
      return <div className="project directions">pick a planet</div>;
    }
  };

  // callbacks
  bangInfo = () => {
    this.setState({ bangInitiated: true });
  };

  getZoomedOn = (dataFromSVG) => {
    this.setState({ zoomedOn: dataFromSVG });
  };

  updatePageChange = () => {
    this.setState({ zoomedOn: null });
  };

  onHomePage = () => {
    this.setState({ onHomePage: false, sideDrawerOpen: false });
  };

  //

  renderHeader = () => {
    if (!this.state.bangInitiated) {
      return (
        <h1
          className="heading-primary"
          style={{
            fontWeight: '200',
            letterSpacing: '.3em',
          }}
        >
          Hello world!
        </h1>
      );
    } else {
      return (
        <div>
          <div className="logo-container">
            <MediaQuery maxWidth={1000}>
              <div
                onClick={this.drawerToggleClickHandler}
                className="hamburger"
              >
                <i className="fas fa-bars fa-2x"></i>
              </div>
            </MediaQuery>
            {/* place hamburger */}

            <NavLink
              to="/"
              className={this.state.darkMode ? 'logo-link' : 'logo-link-light'}
              onClick={() => this.setState({ onHomePage: true })}
            >
              <h1 className="heading-primary-appear">
                James <span className="title-span">Draper</span>
              </h1>
            </NavLink>
          </div>

          {this.state.onHomePage ? this.renderTitle() : null}

          <ul className="navigation">
            <MediaQuery minWidth={1000}>
              <NavLink
                to="/about"
                exact
                className={
                  this.state.darkMode ? 'header-link' : 'header-link-light'
                }
                onClick={() => this.setState({ onHomePage: false })}
              >
                <li>About</li>
              </NavLink>
              <NavLink
                to="/contact"
                exact
                className={
                  this.state.darkMode ? 'header-link' : 'header-link-light'
                }
                onClick={() => this.setState({ onHomePage: false })}
              >
                <li>Contact</li>
              </NavLink>
              <a
                href="https://www.linkedin.com/in/james-draper/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i
                  className="fab fa-linkedin fa-lg header-link header-icon"
                  style={
                    this.state.darkMode
                      ? { color: '' }
                      : { color: 'rgb(208, 179, 87)' }
                  }
                ></i>
              </a>
              <a
                href="https://github.com/jdraper9"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i
                  className="fab fa-github fa-lg header-link header-icon"
                  style={
                    this.state.darkMode
                      ? { color: '' }
                      : { color: 'rgb(208, 179, 87)' }
                  }
                ></i>
              </a>
            </MediaQuery>
          </ul>
        </div>
      );
    }
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div className={this.state.darkMode ? '' : 'body-light'}>
        <Router>
          <div className={this.state.darkMode ? 'header' : 'header-light'}>
            <div className="inner-header">{this.renderHeader()}</div>
          </div>
          <div className="spacer">&nbsp;</div>

          <SideDrawer
            darkMode={this.state.darkMode}
            show={this.state.sideDrawerOpen}
            onHome={this.onHomePage}
          />

          {backdrop}

          <Switch>
            <Route path="/" exact>
              <main>
                <div
                  className={
                    this.state.darkMode
                      ? 'grid-container'
                      : 'grid-container-light'
                  }
                >
                  {/* small size */}
                  <MediaQuery maxWidth={1000}>
                    <div className="svg-wrapper svg-col-large">
                      <SVG
                        getZoomedOn={this.getZoomedOn}
                        bangTrue={this.bangInfo}
                        darkMode={this.state.darkMode}
                      />
                    </div>

                    <div className="small-below-SVG-box">
                      <div
                        className={
                          this.state.darkMode
                            ? 'small-float'
                            : 'small-float-light'
                        }
                      >
                        {this.renderFloat('left')}
                      </div>
                      <div
                        className={
                          this.state.darkMode
                            ? 'small-float'
                            : 'small-float-light'
                        }
                      >
                        {this.renderFloat('right')}
                      </div>
                    </div>

                    {this.state.zoomedOn && (
                      <i
                        class={
                          this.state.darkMode
                            ? 'fas fa-arrows-alt-v fa-2x scroll-arrows'
                            : 'fas fa-arrows-alt-v fa-2x scroll-arrows-light'
                        }
                      ></i>
                    )}
                  </MediaQuery>

                  {/* large size */}
                  <MediaQuery minWidth={1000}>
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
                    {/* float 2, make responsive */}
                    <div
                      className={
                        this.state.darkMode
                          ? 'floats col-1-of-3 right'
                          : 'floats-light col-1-of-3 right'
                      }
                    >
                      {this.renderFloat('right')}
                    </div>
                  </MediaQuery>
                </div>
              </main>
            </Route>
            <Route
              path="/about"
              exact
              component={() => <About darkMode={this.state.darkMode} />}
            ></Route>
            <Route
              path="/contact"
              exact
              component={() => <Contact darkMode={this.state.darkMode} />}
            ></Route>
          </Switch>
        </Router>
        <label htmlFor="toggle-1" className="light-dark">
          <Toggle
            name="toggle-1"
            width="40px"
            height="20px"
            rightKnobColor="rgb(208, 179, 87)"
            rightBorderColor="rgb(208, 179, 87)"
            onToggle={() => this.setState({ darkMode: !this.state.darkMode })}
          />
        </label>
      </div>
    );
  }
}

export default App;
