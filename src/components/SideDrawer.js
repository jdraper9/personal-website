import React from 'react';
import { NavLink } from 'react-router-dom';

const sideDrawer = (props) => (
  <nav className={props.show ? 'side-drawer open' : 'side-drawer'}>
    <ul>
      <li>
        <NavLink
          to="/about"
          exact
          className="side-drawer-link"
          onClick={props.onHome}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          exact
          className="side-drawer-link"
          onClick={props.onHome}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/james-draper/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i
            className="fab fa-linkedin fa-lg header-icon side-drawer-link"
            style={{
              marginLeft: '-6%',
            }}
          ></i>
        </a>
      </li>
      <li>
        <a
          href="https://github.com/jdraper9"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i
            className="fab fa-github fa-lg header-icon side-drawer-link"
            style={{
              marginLeft: '-6%',
            }}
          ></i>
        </a>
      </li>
    </ul>

    {/* <NavLink
      to="/personal-website/about"
      exact
      className={props.darkMode ? 'header-link' : 'header-link-light'}
      onClick={() => this.setState({ onHomePage: false })}
    >
      <li>About</li>
    </NavLink>
    <NavLink
      to="/personal-website/contact"
      exact
      className={props.darkMode ? 'header-link' : 'header-link-light'}
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
        style={props.darkMode ? { color: '' } : { color: 'rgb(208, 179, 87)' }}
      ></i>
    </a>
    <a
      href="https://github.com/jdraper9"
      rel="noopener noreferrer"
      target="_blank"
    >
      <i
        className="fab fa-github fa-lg header-link header-icon"
        style={props.darkMode ? { color: '' } : { color: 'rgb(208, 179, 87)' }}
      ></i>
    </a> */}
  </nav>
);

export default sideDrawer;
