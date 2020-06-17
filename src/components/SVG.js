import React from 'react';
import {
  PI,
  satellite_init,
  particles_init,
  _defaultState,
} from '../constants';

class Home extends React.Component {
  intervalID = 0;
  zoomIntervalID = 0;
  wiggleIntervalID = 0;
  introOnClickIntervalID = 0;

  constructor(props) {
    super(props);

    // this.state = _defaultState;

    // initial conditions for 'planets' and 'satellites'

    this.state = {
      rate: 7,
      selected: null,
      clickedAndSelected: false,
      zoomTimer: 0,
      zoomedIn: false,
      zoomedInBox: null,
      zoomBox: '210 210 80 80',
      zoomedInOn: null,
      orbitRingOpacity: 0,
      notSunOpacity: 0,
      sunOpacity: 0,
      clickedOnSun: false,
      explosionTimer: 0,
      outer: {
        r: 200,
        theta: Math.random() * 6.27,
        coordinates: { x: 250, y: 450 },
        period: 4800,
        satellites: satellite_init.outerSats,
      },
      middle: {
        r: 130,
        theta: Math.random() * 6.27,
        coordinates: { x: 250, y: 125 },
        period: 2900,
        satellites: satellite_init.midSats,
      },
      inner: {
        r: 60,
        theta: Math.random() * 6.27,
        coordinates: { x: 250, y: 300 },
        period: 1500,
        satellites: satellite_init.innerSats,
      },
      sun: {
        coordinates: { x: 250, y: 250 },
        satellites: { 3: { r: 30 } },
      },
      //
      intro: true,
      bangInitiated: false,
      firstZoomOut: true,
      shakeDistance: 0.5,
      initial_particles: particles_init,
      particleOpacity: 1,
    };
  }

  componentDidMount = () => {
    this.intervalID = setInterval(this.rotate, this.state.rate);
    this.wiggleIntervalID = setInterval(this.wiggle, this.state.shakeRate);
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearInterval(this.zoomIntervalID);
    clearInterval(this.wiggleIntervalID);
    clearInterval(this.introOnClickIntervalID);
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
    this.setState({ ...this.state, rate: 7, selected: null }, () => {
      clearInterval(this.intervalID);
      this.intervalID = setInterval(this.rotate, this.state.rate);
    });
  };

  // when a planet group is clicked, zoom, etc. need clickedAndSelected in state so planets stop rotating
  select = () => {
    let clickedAndSelected = this.state.selected !== null ? true : false;
    console.log(this.state.selected);
    this.setState({ clickedAndSelected, zoomedInOn: this.state.selected });
    // group of planet and satellites (outer, middle, inner) need coordinates, and largest radius of satellite

    if (this.state.zoomedIn && clickedAndSelected) {
      // redirect or toggle about
      // switch?
      if (this.state.selected !== 'sun') {
        let url = '';
        if (this.state.zoomedInOn === 'inner') {
          url = 'https://resource-repository.herokuapp.com/';
        } else if (this.state.zoomedInOn === 'middle') {
          url = 'https://jdraper9.github.io/Pathfinding-Visualizer/';
        } else if (this.state.zoomedInOn === 'outer') {
          url = 'https://digi-dopple.firebaseapp.com/';
        }

        window.open(url, 'newtab');
        this.setState({ zoomedInOn: null });
        this.props.getZoomedOn(null);
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
      this.setState({ zoomedInOn: null });
      this.props.getZoomedOn(null);
      // this is how clicking out fixes post Intro
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
    if (this.state.zoomTimer === 201 && this.state.firstZoomOut) {
      this.setState({
        zoomTimer: 0,
        zoomedIn: false,
        zoomedInBox: null,
        clickedOnSun: false,
        notSunOpacity: 1,
        firstZoomOut: false,
      });
      clearInterval(this.zoomIntervalID);
    } else if (this.state.zoomTimer === 201) {
      this.props.getZoomedOn(this.state.zoomedInOn);
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
      if (!this.state.firstZoomOut) {
        this.setState({
          zoomTimer: !this.state.zoomedIn
            ? this.state.zoomTimer + 1
            : this.state.zoomTimer - 1,
          zoomBox: zoomBoxString,
          orbitRingOpacity: !this.state.zoomedIn
            ? this.state.orbitRingOpacity - (1 / 200) * 0.1
            : this.state.orbitRingOpacity + (1 / 200) * 0.1,
          notSunOpacity:
            !this.state.zoomedIn && this.state.clickedOnSun
              ? this.state.notSunOpacity - (1 / 200) * 1
              : this.state.notSunOpacity + (1 / 200) * 1,
        });
      } else {
        this.setState({
          zoomTimer: this.state.zoomTimer + 1,
          zoomBox: zoomBoxString,
          orbitRingOpacity: this.state.orbitRingOpacity + (1 / 200) * 0.1,
          notSunOpacity: this.state.notSunOpacity + (1 / 200) * 1,
        });
      }
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
      : sphere.theta + thetaIncrement;

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

  getNewRandomXY(value) {
    return (
      value +
      Math.random() * this.state.shakeDistance -
      this.state.shakeDistance / 2
    );
  }

  wiggle = () => {
    let newParticles = {
      1: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[1].coordinates.x),
          y: this.getNewRandomXY(particles_init[1].coordinates.y),
        },
        endPoint: particles_init[1].endPoint,
      },
      2: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[2].coordinates.x),
          y: this.getNewRandomXY(particles_init[2].coordinates.y),
        },
        endPoint: particles_init[2].endPoint,
      },
      3: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[3].coordinates.x),
          y: this.getNewRandomXY(particles_init[3].coordinates.y),
        },
        endPoint: particles_init[3].endPoint,
      },
      4: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[4].coordinates.x),
          y: this.getNewRandomXY(particles_init[4].coordinates.y),
        },
        endPoint: particles_init[4].endPoint,
      },
      5: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[5].coordinates.x),
          y: this.getNewRandomXY(particles_init[5].coordinates.y),
        },
        endPoint: particles_init[5].endPoint,
      },
      6: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[6].coordinates.x),
          y: this.getNewRandomXY(particles_init[6].coordinates.y),
        },
        endPoint: particles_init[6].endPoint,
      },
      7: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[7].coordinates.x),
          y: this.getNewRandomXY(particles_init[7].coordinates.y),
        },
        endPoint: particles_init[7].endPoint,
      },
      8: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[8].coordinates.x),
          y: this.getNewRandomXY(particles_init[8].coordinates.y),
        },
        endPoint: particles_init[8].endPoint,
      },
      9: {
        coordinates: {
          x: this.getNewRandomXY(particles_init[9].coordinates.x),
          y: this.getNewRandomXY(particles_init[9].coordinates.y),
        },
        endPoint: particles_init[9].endPoint,
      },
      yellow: {
        coordinates: {
          x: this.getNewRandomXY(particles_init.yellow.coordinates.x),
          y: this.getNewRandomXY(particles_init.yellow.coordinates.y),
        },
        endPoint: particles_init.yellow.endPoint,
      },
      blue: {
        coordinates: {
          x: this.getNewRandomXY(particles_init.blue.coordinates.x),
          y: this.getNewRandomXY(particles_init.blue.coordinates.y),
        },
        endPoint: particles_init.blue.endPoint,
      },
      green: {
        coordinates: {
          x: this.getNewRandomXY(particles_init.green.coordinates.x),
          y: this.getNewRandomXY(particles_init.green.coordinates.y),
        },
        endPoint: particles_init.green.endPoint,
      },
    };

    this.setState({ initial_particles: newParticles });
  };

  onSunHover = () => {
    if (!this.state.bangInitiated) {
      this.setState({ shakeDistance: 1.5, sunOpacity: 0.1 });
    }
    // this.setState({ selected: 'sun' });
  };

  offSunHover = () => {
    if (!this.state.bangInitiated) {
      this.setState({ shakeDistance: 0.25, sunOpacity: 0 });
    }
    // this.setState({ selected: null });
  };

  bangFunction = () => {
    // zoom out starts here
    // Optimal procedure
    // have it zoom out like any other zoom out
    // have to understand how clickedONSun was working before
    // earlier, specified to make orbitOpacity work
    if (this.state.explosionTimer >= 1) {
      this.setState({ intro: false });
      clearInterval(this.introOnClickIntervalID);
      // acting as though zooming in.. need to be zooming out
      this.zoomIntervalID = setInterval(
        () => this.zoomIntervalFunction(210, 210, 80, 80, 0, 0, 500, 500),
        1
      );
    }
    const initial_particles = this.state.initial_particles;
    const updatedParticles = {};
    const updatedExplosionTimer = this.state.explosionTimer + 1 / 250;
    for (const particle in initial_particles) {
      let x0 = initial_particles[particle].coordinates.x,
        x1 = initial_particles[particle].endPoint.x,
        y0 = initial_particles[particle].coordinates.y,
        y1 = initial_particles[particle].endPoint.y;
      updatedParticles[particle] = {
        coordinates: {
          x: (x1 - x0) * updatedExplosionTimer + x0,
          y: (y1 - y0) * updatedExplosionTimer + y0,
        },
        endPoint: initial_particles[particle].endPoint,
      };
    }
    this.setState({
      initial_particles: updatedParticles,
      explosionTimer: updatedExplosionTimer,
      sunOpacity:
        updatedExplosionTimer * 5 > 0.48 ? 0.48 : updatedExplosionTimer * 5,
      particleOpacity: 1 - updatedExplosionTimer * 2,
    });
  };

  bang = () => {
    this.setState({ bangInitiated: true });
    this.props.bangTrue();
    clearInterval(this.wiggleIntervalID);
    this.introOnClickIntervalID = setInterval(this.bangFunction, 1);
  };

  render() {
    return (
      <svg
        className={this.props.darkMode ? 'main-svg' : 'main-svg-light'}
        // seems like you can increase this and it scales
        // width="auto"
        width="700"
        height="700"
        viewBox={this.state.zoomBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={this.select}
      >
        <g
          id="planets_3"
          opacity={this.state.intro ? '0' : this.state.notSunOpacity}
        >
          {/*  */}

          <g id="outer">
            <g id="outer-ring-3">
              <circle
                cx={this.state.outer.coordinates.x}
                cy={this.state.outer.coordinates.y}
                r="36"
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="0.13"
                strokeWidth="0.2"
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
              stroke={
                this.state.selected === 'outer'
                  ? 'blue'
                  : this.props.darkMode
                  ? 'white'
                  : 'black'
              }
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
              stroke={
                this.state.selected === 'middle'
                  ? 'orange'
                  : this.props.darkMode
                  ? 'white'
                  : 'black'
              }
              strokeOpacity={`${this.state.orbitRingOpacity}`}
            />
            <circle
              id="middle"
              cx={this.state.middle.coordinates.x}
              cy={this.state.middle.coordinates.y}
              r="7"
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
                stroke={this.props.darkMode ? 'white' : 'black'}
                strokeOpacity="00.13"
                strokeWidth="0.2"
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
              stroke={
                this.state.selected === 'inner'
                  ? 'green'
                  : this.props.darkMode
                  ? 'white'
                  : 'black'
              }
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
          className="intro-box"
          id="intro-and-sun"
          onMouseEnter={this.onSunHover}
          onMouseLeave={this.offSunHover}
          onClick={!this.state.bangInitiated ? this.bang : null}
        >
          <g id="sun">
            <circle
              cx="250"
              cy="250"
              r={this.state.intro ? 30 : 20}
              fill="url(#paint0_radial)"
              opacity={this.state.sunOpacity}
            />
            <circle
              cx="250"
              cy="250"
              r="29.8"
              stroke={this.props.darkMode ? 'white' : 'black'}
              strokeOpacity="0.05"
              strokeWidth="0.2"
              visibility={this.state.intro ? '' : 'hidden'}
            />
          </g>
          <g
            id="intro-sats"
            visibility={this.state.intro ? '' : 'hidden'}
            opacity={this.state.particleOpacity}
          >
            <circle
              id="teeny-tiny9"
              cx={this.state.initial_particles[9].coordinates.x}
              cy={this.state.initial_particles[9].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny8"
              cx={this.state.initial_particles[8].coordinates.x}
              cy={this.state.initial_particles[8].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny7"
              cx={this.state.initial_particles[7].coordinates.x}
              cy={this.state.initial_particles[7].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny6"
              cx={this.state.initial_particles[6].coordinates.x}
              cy={this.state.initial_particles[6].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny5"
              cx={this.state.initial_particles[5].coordinates.x}
              cy={this.state.initial_particles[5].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny4"
              cx={this.state.initial_particles[4].coordinates.x}
              cy={this.state.initial_particles[4].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny3"
              cx={this.state.initial_particles[3].coordinates.x}
              cy={this.state.initial_particles[3].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny2"
              cx={this.state.initial_particles[2].coordinates.x}
              cy={this.state.initial_particles[2].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
            <circle
              id="teeny-tiny1"
              cx={this.state.initial_particles[1].coordinates.x}
              cy={this.state.initial_particles[1].coordinates.y}
              r="1.5"
              fill="#3D413E"
            />
          </g>
          <g
            id="intro-planets"
            visibility={this.state.intro ? '' : 'hidden'}
            opacity={this.state.particleOpacity}
          >
            <circle
              id="yellow"
              cx={this.state.initial_particles.yellow.coordinates.x}
              cy={this.state.initial_particles.yellow.coordinates.y}
              r="5.5"
              fill="#A54F00"
            />
            <circle
              id="blue"
              cx={this.state.initial_particles.blue.coordinates.x}
              cy={this.state.initial_particles.blue.coordinates.y}
              r="5"
              fill="#4074B1"
            />
            <circle
              id="green"
              cx={this.state.initial_particles.green.coordinates.x}
              cy={this.state.initial_particles.green.coordinates.y}
              r="6"
              fill="#177431"
            />
          </g>
        </g>
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(250 250) rotate(90) scale(${
              this.state.intro ? 30 : 20
            })`}
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
