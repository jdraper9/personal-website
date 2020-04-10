import React from 'react';
import { PI, satellite_init } from '../constants';

class Home extends React.Component {
  intervlID = 0;
  constructor(props) {
    super(props);

    // initial conditions for 'planets' and 'satellites'

    this.state = {
      rate: 1,
      selected: null,
      clickedAndSelected: false,
      zoomBox: '0 0 500 500',
      outer: {
        r: 200,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 450 },
        period: 5000,
        satellites: satellite_init.outerSats,
      },
      middle: {
        r: 125,
        theta: 0.5 * PI,
        coordinates: { x: 250, y: 125 },
        period: 3000,
        satellites: satellite_init.midSats,
      },
      inner: {
        r: 50,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 300 },
        period: 1500,
        satellites: satellite_init.innerSats,
      },
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(this.rotate, this.state.rate);
  }

  // onHover, slow rotation speed
  slow = (ring) => {
    this.setState(
      { ...this.state, rate: ring.rate, selected: ring.title },
      () => {
        clearInterval(this.intervalID);
        this.intervalID = setInterval(this.rotate, this.state.rate);
      }
    );
  };

  // offHover, resume original speed
  fast = () => {
    this.setState({ ...this.state, rate: 1, selected: null }, () => {
      clearInterval(this.intervalID);
      this.intervalID = setInterval(this.rotate, this.state.rate);
    });
  };

  // when a planet group is selected, zoom, etc
  select = () => {
    let clickedAndSelected = this.state.selected !== null ? true : false;
    var viewBoxString = '0 0 500 500';
    // group of planet and satellites (outer, middle, inner) need coordinates, and largest radius of satellite
    if (clickedAndSelected) {
      let selectedOrbit = this.state[this.state.selected];
      let largestSatRadius = Math.round(selectedOrbit.satellites[3].r);
      let x = Math.round(selectedOrbit.coordinates.x),
        y = Math.round(selectedOrbit.coordinates.y);
      let viewMinX = x - (largestSatRadius + 10),
        viewMinY = y - (largestSatRadius + 10),
        width = 2 * largestSatRadius + 20,
        height = 2 * largestSatRadius + 20;

      viewBoxString = `${viewMinX} ${viewMinY} ${width} ${height} `;
    }
    this.setState({ clickedAndSelected, zoomBox: viewBoxString });
  };

  rotate = () => {
    this.setState({
      rate: this.state.rate,
      outer: this.updateSpheres(this.state.outer),
      middle: this.updateSpheres(this.state.middle),
      inner: this.updateSpheres(this.state.inner),
    });
  };

  // receiving blue object with r, theta, x, y
  // return object with same r, new theta, x, y, satellites
  updateSpheres = (sphere) => {
    let fractionOfCircle = sphere.period,
      thetaIncrement = (2 * PI) / fractionOfCircle,
      r = sphere.r;

    let newTheta = this.state.clickedAndSelected
      ? sphere.theta
      : sphere.theta - thetaIncrement;

    let x = r * Math.cos(newTheta),
      y = r * Math.sin(newTheta);

    // object {x: , y: }
    let XY = this.convertCoordToSVGFrame(x, y);

    // calc sat's here with XY
    for (const sat in sphere.satellites) {
      let updatedSat = this.updateSatellite(sphere.satellites[sat]);
      sphere.satellites[sat] = updatedSat;
    }

    return {
      r,
      theta: newTheta,
      coordinates: XY,
      period: fractionOfCircle,
      satellites: sphere.satellites,
    };
  };

  updateSatellite(sat) {
    let newTheta = sat.theta - (2 * PI) / sat.period;

    return {
      r: sat.r,
      theta: newTheta,
      satDistance: {
        x: sat.r * Math.cos(newTheta),
        y: sat.r * Math.sin(newTheta),
      },
      period: sat.period,
    };
  }

  convertCoordToSVGFrame(x, y) {
    return { x: x + 250, y: -y + 250 };
  }

  render() {
    return (
      <svg
        // seems like you can increase this and it scales
        width="700"
        height="700"
        viewBox={this.state.zoomBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={this.select}
      >
        <g id="planets_3">
          {/*  */}

          <g
            id="outer"
            onMouseEnter={() => this.slow({ title: 'outer', rate: 60 })}
            onMouseLeave={this.fast}
          >
            <g id="outer-ring-3">
              <circle
                cx={this.state.outer.coordinates.x}
                cy={this.state.outer.coordinates.y}
                r="47.3"
                stroke="black"
                strokeOpacity="0.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="out-sat-3"
              cx={
                this.state.outer.coordinates.x +
                this.state.outer.satellites[3].satDistance.x
              }
              cy={
                this.state.outer.coordinates.y +
                this.state.outer.satellites[3].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            <g id="outer-ring-2">
              <circle
                cx={this.state.outer.coordinates.x}
                cy={this.state.outer.coordinates.y}
                r="34.8"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="out-sat-2"
              cx={
                this.state.outer.coordinates.x +
                this.state.outer.satellites[2].satDistance.x
              }
              cy={
                this.state.outer.coordinates.y +
                this.state.outer.satellites[2].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            <g id="outer-ring-1">
              <circle
                cx={this.state.outer.coordinates.x}
                cy={this.state.outer.coordinates.y}
                r="24.8"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="out-sat-1"
              cx={
                this.state.outer.coordinates.x +
                this.state.outer.satellites[1].satDistance.x
              }
              cy={
                this.state.outer.coordinates.y +
                this.state.outer.satellites[1].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            {/* outer circle */}

            <circle
              id="outer-orbit"
              cx="250"
              cy="250"
              r="199.5"
              stroke={this.state.selected === 'outer' ? 'blue' : 'black'}
              strokeOpacity="0.25"
            />
            <circle
              id="outer"
              cx={this.state.outer.coordinates.x}
              cy={this.state.outer.coordinates.y}
              r="10"
              fill="#3D413E"
            />
          </g>

          {/*  */}

          <g
            id="mid"
            onMouseEnter={() => this.slow({ title: 'middle', rate: 70 })}
            onMouseLeave={this.fast}
          >
            <g id="mid-ring-3">
              <circle
                cx={this.state.middle.coordinates.x}
                cy={this.state.middle.coordinates.y}
                r="36.3"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="mid-sat-3"
              cx={
                this.state.middle.coordinates.x +
                this.state.middle.satellites[3].satDistance.x
              }
              cy={
                this.state.middle.coordinates.y +
                this.state.middle.satellites[3].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            <g id="mid-ring-2">
              <circle
                cx={this.state.middle.coordinates.x}
                cy={this.state.middle.coordinates.y}
                r="32.3"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="mid-sat-2"
              cx={
                this.state.middle.coordinates.x +
                this.state.middle.satellites[2].satDistance.x
              }
              cy={
                this.state.middle.coordinates.y +
                this.state.middle.satellites[2].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            <g id="mid-ring-1">
              <circle
                cx={this.state.middle.coordinates.x}
                cy={this.state.middle.coordinates.y}
                r="22.8"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="mid-sat-1"
              cx={
                this.state.middle.coordinates.x +
                this.state.middle.satellites[1].satDistance.x
              }
              cy={
                this.state.middle.coordinates.y +
                this.state.middle.satellites[1].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            {/* middle  */}
            <circle
              id="middle-orbit"
              cx="250"
              cy="250"
              r="124.5"
              stroke={this.state.selected === 'middle' ? 'green' : 'black'}
              strokeOpacity="0.25"
            />
            <circle
              id="middle"
              cx={this.state.middle.coordinates.x}
              cy={this.state.middle.coordinates.y}
              r="8"
              fill="#3D413E"
            />
          </g>

          {/*  */}

          <g
            id="center"
            onMouseEnter={() => this.slow({ title: 'inner', rate: 90 })}
            onMouseLeave={this.fast}
          >
            <g id="in-ring-3">
              <circle
                cx={this.state.inner.coordinates.x}
                cy={this.state.inner.coordinates.y}
                r="34.8"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="in-sat-3"
              cx={
                this.state.inner.coordinates.x +
                this.state.inner.satellites[3].satDistance.x
              }
              cy={
                this.state.inner.coordinates.y +
                this.state.inner.satellites[3].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            <g id="in-ring-2">
              <circle
                cx={this.state.inner.coordinates.x}
                cy={this.state.inner.coordinates.y}
                r="29.8"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="in-sat-2"
              cx={
                this.state.inner.coordinates.x +
                this.state.inner.satellites[2].satDistance.x
              }
              cy={
                this.state.inner.coordinates.y +
                this.state.inner.satellites[2].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            <g id="in-ring-1">
              <circle
                cx={this.state.inner.coordinates.x}
                cy={this.state.inner.coordinates.y}
                r="19.8"
                stroke="black"
                strokeOpacity="00.13"
                strokeWidth="0.4"
              />
            </g>
            <circle
              id="in-sat-1"
              cx={
                this.state.inner.coordinates.x +
                this.state.inner.satellites[1].satDistance.x
              }
              cy={
                this.state.inner.coordinates.y +
                this.state.inner.satellites[1].satDistance.y
              }
              r="1.5"
              fill="gray"
            />
            {/* inner */}
            <circle
              id="inner-orbit"
              cx="250"
              cy="250"
              r="49.5"
              stroke={this.state.selected === 'inner' ? 'purple' : 'black'}
              strokeOpacity="0.25"
            />
            <circle
              id="inner"
              cx={this.state.inner.coordinates.x}
              cy={this.state.inner.coordinates.y}
              r="6"
              fill="#3D413E"
            />
          </g>
        </g>
      </svg>
    );
  }
}

export default Home;
