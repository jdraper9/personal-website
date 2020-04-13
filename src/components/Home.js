import React from 'react';
import { PI, satellite_init } from '../constants';

class Home extends React.Component {
  intervalID = 0;
  zoomIntervalID = 0;

  constructor(props) {
    super(props);

    // initial conditions for 'planets' and 'satellites'

    this.state = {
      rate: 1,
      selected: null,
      clickedAndSelected: false,
      zoomTimer: 0,
      zoomedIn: false,
      zoomedInBox: null,
      zoomBox: '0 0 500 500',
      orbitRingOpacity: 0.25,
      notSunOpacity: 1,
      clickedOnSun: false,
      outer: {
        r: 200,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 450 },
        period: 5000,
        satellites: satellite_init.outerSats,
      },
      middle: {
        r: 130,
        theta: 0.5 * PI,
        coordinates: { x: 250, y: 125 },
        period: 3000,
        satellites: satellite_init.midSats,
      },
      inner: {
        r: 60,
        theta: 1.5 * PI,
        coordinates: { x: 250, y: 300 },
        period: 1500,
        satellites: satellite_init.innerSats,
      },
      sun: {
        coordinates: { x: 250, y: 250 },
        satellites: { 3: { r: 30 } },
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

  // when a planet group is clicked, zoom, etc. need clickedAndSelected in state so planets stop rotating
  select = () => {
    let clickedAndSelected = this.state.selected !== null ? true : false;
    this.setState({ clickedAndSelected });
    // group of planet and satellites (outer, middle, inner) need coordinates, and largest radius of satellite

    if (this.state.zoomedIn && clickedAndSelected) {
      // redirect or toggle about
      // switch?
      if (this.state.selected !== 'sun') {
        window.open('https://www.google.com', 'newtab');
      } else {
        console.log('hey');
      }
    }

    if (clickedAndSelected) {
      if (this.state.selected === 'sun') {
        this.setState({ clickedOnSun: true });
      }
      let selectedOrbit = this.state[this.state.selected];
      let largestSatRadius = Math.round(selectedOrbit.satellites[3].r);
      let x = Math.round(selectedOrbit.coordinates.x),
        y = Math.round(selectedOrbit.coordinates.y);
      let viewMinX = x - (largestSatRadius + 10),
        viewMinY = y - (largestSatRadius + 10),
        width = 2 * largestSatRadius + 20,
        height = 2 * largestSatRadius + 20;

      // zoom in
      this.zoomIntervalID = setInterval(
        () =>
          this.zoomIntervalFunction(
            0,
            0,
            500,
            500,
            viewMinX,
            viewMinY,
            width,
            height
          ),
        1
      );
      // zoom out
    } else if (this.state.zoomedIn) {
      this.zoomIntervalID = setInterval(
        () =>
          this.zoomIntervalFunction(
            0,
            0,
            500,
            500,
            this.state.zoomedInBox.x,
            this.state.zoomedInBox.y,
            this.state.zoomedInBox.w,
            this.state.zoomedInBox.h
          ),
        1
      );
    } else {
    }
  };

  zoomIntervalFunction = (x0, y0, w0, h0, x1, y1, w1, h1) => {
    if (this.state.zoomTimer === 201) {
      this.setState({
        zoomTimer: 200,
        zoomedIn: true,
        zoomedInBox: { x: x1, y: y1, w: w1, h: h1 },
      });
      clearInterval(this.zoomIntervalID);
    } else if (this.state.zoomTimer === -1 && this.state.zoomedIn) {
      this.setState({
        zoomTimer: 0,
        zoomedIn: false,
        zoomedInBox: null,
        clickedOnSun: false,
        notSunOpacity: 1,
      });
      clearInterval(this.zoomIntervalID);
    } else {
      let zoomBoxString = this.incrementZoom(
        x0,
        y0,
        w0,
        h0,
        x1,
        y1,
        w1,
        h1,
        this.state.zoomTimer / 200
      );
      this.setState({
        zoomTimer: !this.state.zoomedIn
          ? this.state.zoomTimer + 1
          : this.state.zoomTimer - 1,
        zoomBox: zoomBoxString,
        orbitRingOpacity: !this.state.zoomedIn
          ? this.state.orbitRingOpacity - (1 / 200) * 0.25
          : this.state.orbitRingOpacity + (1 / 200) * 0.25,
        notSunOpacity:
          !this.state.zoomedIn && this.state.clickedOnSun
            ? this.state.notSunOpacity - (1 / 200) * 1
            : this.state.notSunOpacity + (1 / 200) * 1,
      });
    }
  };

  incrementZoom(x0, y0, w0, h0, x1, y1, w1, h1, segmentFraction) {
    let newX = (x1 - x0) * segmentFraction + x0,
      newY = (y1 - y0) * segmentFraction + y0,
      newW = (w1 - w0) * segmentFraction + w0,
      newH = (h1 - h0) * segmentFraction + h0;

    return `${newX} ${newY} ${newW} ${newH}`;
  }

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
        <g id="planets_3" opacity={this.state.notSunOpacity}>
          {/*  */}

          <g id="outer">
            <g id="outer-ring-3">
              <circle
                cx={this.state.outer.coordinates.x}
                cy={this.state.outer.coordinates.y}
                r="36"
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
                r="30"
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
                r="22"
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
              strokeOpacity={`${this.state.orbitRingOpacity}`}
            />
            <circle
              id="outer"
              cx={this.state.outer.coordinates.x}
              cy={this.state.outer.coordinates.y}
              r="9"
              fill="#4074B1"
              opacity=".95"
              onMouseEnter={() => this.slow({ title: 'outer', rate: 60 })}
              onMouseLeave={this.fast}
            />
          </g>

          {/*  */}

          <g id="mid">
            <g id="mid-ring-3">
              <circle
                cx={this.state.middle.coordinates.x}
                cy={this.state.middle.coordinates.y}
                r="30"
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
                r="22"
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
                r="16"
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
              r="130"
              stroke={this.state.selected === 'middle' ? 'orange' : 'black'}
              strokeOpacity={`${this.state.orbitRingOpacity}`}
            />
            <circle
              id="middle"
              cx={this.state.middle.coordinates.x}
              cy={this.state.middle.coordinates.y}
              r="8"
              fill="#A54F00"
              opacity=".95"
              onMouseEnter={() => this.slow({ title: 'middle', rate: 70 })}
              onMouseLeave={this.fast}
            />
          </g>

          {/*  */}

          <g id="center">
            <g id="in-ring-3">
              <circle
                cx={this.state.inner.coordinates.x}
                cy={this.state.inner.coordinates.y}
                r="25"
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
              r="1"
              fill="gray"
            />
            <g id="in-ring-2">
              <circle
                cx={this.state.inner.coordinates.x}
                cy={this.state.inner.coordinates.y}
                r="20"
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
              r="1"
              fill="gray"
            />
            <g id="in-ring-1">
              <circle
                cx={this.state.inner.coordinates.x}
                cy={this.state.inner.coordinates.y}
                r="14"
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
              r="1"
              fill="gray"
            />
            {/* inner */}
            <circle
              id="inner-orbit"
              cx="250"
              cy="250"
              r="60"
              stroke={this.state.selected === 'inner' ? 'green' : 'black'}
              strokeOpacity={`${this.state.orbitRingOpacity}`}
            />
            <circle
              id="inner"
              cx={this.state.inner.coordinates.x}
              cy={this.state.inner.coordinates.y}
              r="6"
              fill="#177431"
              onMouseEnter={() => this.slow({ title: 'inner', rate: 90 })}
              onMouseLeave={this.fast}
              opacity=".95"
            />
          </g>
        </g>
        <g
          id="intro-and-sun"
          onMouseEnter={() => this.slow({ title: 'sun', rate: 3 })}
          onMouseLeave={this.fast}
        >
          <g id="sun">
            <circle cx="250" cy="250" r="30" fill="url(#paint0_radial)" />
          </g>
          <g id="intro-sats">
            <circle
              id="teeny-tiny9"
              cx="265.5"
              cy="268.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny8"
              cx="249.5"
              cy="263.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny7"
              cx="270.5"
              cy="245.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny6"
              cx="226.5"
              cy="246.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny5"
              cx="234.5"
              cy="236.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny4"
              cx="263.5"
              cy="233.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny3"
              cx="254.5"
              cy="246.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny2"
              cx="236.5"
              cy="268.5"
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny1"
              cx="244.5"
              cy="249.5"
              r="1.5"
              fill="#3D413E"
            />
          </g>
          <g id="intro-planets">
            <circle id="yellow" cx="235.5" cy="255.5" r="5.5" fill="#A54F00" />
            <circle id="blue_2" cx="262" cy="257" r="5" fill="#4074B1" />
            <circle id="green_2" cx="249" cy="234" r="6" fill="#177431" />
          </g>
        </g>
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(250 250) rotate(90) scale(30)"
          >
            <stop stopColor="#FFB03A" />
            <stop offset="1" stopColor="#F50C0C" stopOpacity="0" />
            <stop offset="1" stopColor="#FFF73A" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );
  }
}

export default Home;
