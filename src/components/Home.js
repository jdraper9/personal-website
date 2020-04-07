import React from 'react';
import { PI } from '../constants';

class Home extends React.Component {
  constructor(props) {
    super(props);

    // adapt this svg file
    // define satellite init state.. will there be a problem with defining state with state? no, set initial conditions
    //          update in updateSpheres

    //insert satellites into respective arrays
    this.state = {
      rate: 1,
      blue: {
        r: 200,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 450 },
        period: 5000,
        satellites: [],
      },
      green: {
        r: 125,
        theta: 0.5 * PI,
        coordinates: { x: 250, y: 125 },
        period: 3000,
        satellites: [],
      },
      yellow: {
        r: 50,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 300 },
        period: 1500,
        satellites: [],
      },
    };
  }

  componentDidMount() {
    setInterval(this.rotate, this.state.rate);
  }

  rotate = () => {
    this.setState({
      rate: this.state.rate,
      blue: this.updateSpheres(this.state.blue),
      green: this.updateSpheres(this.state.green),
      yellow: this.updateSpheres(this.state.yellow),
    });
  };

  // receiving blue object with r, theta, x, y
  // return object with same r, new theta, x, y, satellites
  updateSpheres = (sphere) => {
    let fractionOfCircle = sphere.period,
      thetaIncrement = (2 * PI) / fractionOfCircle,
      newTheta = sphere.theta - thetaIncrement,
      r = sphere.r;

    let x = r * Math.cos(newTheta),
      y = r * Math.sin(newTheta);

    let XY = this.convertCoordToSVGFrame(x, y);
    return { r, theta: newTheta, coordinates: XY, period: fractionOfCircle };
  };

  convertCoordToSVGFrame(x, y) {
    return { x: x + 250, y: -y + 250 };
  }

  render() {
    return (
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="planets_3">
          <g id="outer">
            <g id="outer-ring-3">
              <circle
                cx="253.5"
                cy="450.5"
                r="47.3"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="253.5"
                cy="450.5"
                r="47.3"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="out-sat-3"
              cx="297.5"
              cy="468.5"
              r="1.5"
              fill="#3D413E"
            />
            <g id="outer-ring-2">
              <circle
                cx="253"
                cy="450"
                r="34.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="253"
                cy="450"
                r="34.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="out-sat-2"
              cx="221.5"
              cy="464.5"
              r="1.5"
              fill="#3D413E"
            />
            <g id="outer-ring1">
              <circle
                cx="253"
                cy="450"
                r="24.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="253"
                cy="450"
                r="24.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="out-sat-1"
              cx="253.5"
              cy="425.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle id="blue" cx="253" cy="450" r="18" fill="#4E82E9" />
            <circle
              id="outer-orbit"
              cx="250"
              cy="250"
              r="199.5"
              stroke="black"
              stroke-opacity="0.25"
            />
          </g>
          <g id="mid">
            <g id="mid-ring-3">
              <circle
                cx="249.5"
                cy="126.5"
                r="36.3"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="249.5"
                cy="126.5"
                r="36.3"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="mid-sat-3"
              cx="249.5"
              cy="90.5"
              r="1.5"
              fill="#3D413E"
            />
            <g id="mid-ring-2">
              <circle
                cx="249.5"
                cy="125.5"
                r="32.3"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="249.5"
                cy="125.5"
                r="32.3"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="mid-sat-2"
              cx="281.5"
              cy="126.5"
              r="1.5"
              fill="#3D413E"
            />
            <g id="mid-ring-1">
              <circle
                cx="250"
                cy="126"
                r="22.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="250"
                cy="126"
                r="22.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="mid-sat-1"
              cx="227.5"
              cy="126.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle id="green" cx="249" cy="125" r="16" fill="#59BF76" />
            <circle
              id="middle-orbit"
              cx="250"
              cy="250"
              r="124.5"
              stroke="black"
              stroke-opacity="0.25"
            />
          </g>
          <g id="center">
            <g id="in-ring-3">
              <circle
                cx="250"
                cy="300"
                r="34.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="250"
                cy="300"
                r="34.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="in-sat-3"
              cx="215.5"
              cy="298.5"
              r="1.5"
              fill="#3D413E"
            />
            <g id="in-ring-2">
              <circle
                cx="250"
                cy="300"
                r="29.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="250"
                cy="300"
                r="29.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="in-sat-2"
              cx="250.5"
              cy="329.5"
              r="1.5"
              fill="#3D413E"
            />
            <g id="in-ring-1">
              <circle
                cx="250"
                cy="300"
                r="19.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
              <circle
                cx="250"
                cy="300"
                r="19.8"
                stroke="black"
                stroke-opacity="0.05"
                stroke-width="0.4"
              />
            </g>
            <circle
              id="in-sat-1"
              cx="263.5"
              cy="285.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle id="yellow" cx="250" cy="300" r="15" fill="#DDE040" />
            <circle
              id="inner-orbit"
              cx="250"
              cy="250"
              r="49.5"
              stroke="black"
              stroke-opacity="0.25"
            />
          </g>
        </g>
      </svg>
    );
  }
}

export default Home;

// <svg
//         width="500"
//         height="500"
//         viewBox="0 0 500 500"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g id="planets_2">
//           <circle
//             id="outer-orbit"
//             cx="250"
//             cy="250"
//             r="200"
//             stroke="black"
//             strokeOpacity="0.25"
//           />
//           <circle
//             id="middle-orbit"
//             cx="250"
//             cy="250"
//             r="125"
//             stroke="black"
//             strokeOpacity="0.25"
//           />
//           <circle
//             id="inner-orbit"
//             cx="250"
//             cy="250"
//             r="50"
//             stroke="black"
//             strokeOpacity="0.25"
//           />
//           <circle
//             className="outer-circle"
//             cx={this.state.blue.coordinates.x}
//             cy={this.state.blue.coordinates.y}
//             r="10"
//             fill="gray"
//           />
//           <circle
//             id="mid-circle"
//             cx={this.state.green.coordinates.x}
//             cy={this.state.green.coordinates.y}
//             r="8"
//             fill="gray"
//           />
//           <circle
//             className="inner-circle"
//             cx={this.state.yellow.coordinates.x}
//             cy={this.state.yellow.coordinates.y}
//             r="6"
//             fill="gray"
//           />
//         </g>
//       </svg>
