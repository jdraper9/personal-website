import React from 'react';
import { PI } from '../constants';

class SVG extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 25,
      blue: {
        r: 200,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 450 },
        period: 400,
      },
      green: {
        r: 125,
        theta: 0.5 * PI,
        coordinates: { x: 250, y: 125 },
        period: 300,
      },
      yellow: {
        r: 50,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 300 },
        period: 200,
      },
    };
  }

  componentDidMount() {
    setInterval(this.rotate, this.state.rate);
  }

  rotate = () => {
    this.setState({
      rate: this.state.rate,
      blue: this.updateXY(this.state.blue),
      green: this.updateXY(this.state.green),
      yellow: this.updateXY(this.state.yellow),
    });
  };

  // receiving blue object with r, theta, x, y
  // return updated theta, x, y
  updateXY = (sphere) => {
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
        <g id="planets_2">
          <circle
            id="outer-orbit"
            cx="250"
            cy="250"
            r="200"
            stroke="black"
            strokeOpacity="0.25"
          />
          <circle
            id="middle-orbit"
            cx="250"
            cy="250"
            r="125"
            stroke="black"
            strokeOpacity="0.25"
          />
          <circle
            id="inner-orbit"
            cx="250"
            cy="250"
            r="50"
            stroke="black"
            strokeOpacity="0.25"
          />
          <circle
            className="outer-circle"
            cx={this.state.blue.coordinates.x}
            cy={this.state.blue.coordinates.y}
            r="10"
            fill="gray"
          />
          <circle
            id="mid-circle"
            cx={this.state.green.coordinates.x}
            cy={this.state.green.coordinates.y}
            r="8"
            fill="gray"
          />
          <circle
            className="inner-circle"
            cx={this.state.yellow.coordinates.x}
            cy={this.state.yellow.coordinates.y}
            r="6"
            fill="gray"
          />
        </g>
      </svg>
    );
  }
}

export default SVG;
