export const PI = Math.PI;

export const satellite_init = {
  outerSats: {
    1: {
      r: 24.8,
      theta: 0.5 * PI,
      satDistance: { x: 0, y: 24.8 },
      period: 400,
    },
    2: {
      r: 34.8,
      theta: (4 / 3) * PI,
      satDistance: { x: -17.4, y: -30.14 },
      period: 600,
    },
    3: {
      r: 47.3,
      theta: (5 / 3) * PI,
      satDistance: { x: 23.65, y: -40.96 },
      period: 800,
    },
  },
  midSats: {
    1: {
      r: 22.8,
      theta: PI,
      satDistance: { x: -22.8, y: 0 },
      period: 300,
    },
    2: {
      r: 32.3,
      theta: 0,
      satDistance: { x: 32.3, y: 0 },
      period: 600,
    },
    3: {
      r: 36.3,
      theta: 0.5 * PI,
      satDistance: { x: 0, y: 36.3 },
      period: 900,
    },
  },
  innerSats: {
    1: {
      r: 19.8,
      theta: (1 / 3) * PI,
      satDistance: { x: 9.9, y: 17.15 },
      period: 400,
    },
    2: {
      r: 29.8,
      theta: (3 / 2) * PI,
      satDistance: { x: 0, y: -29.8 },
      period: 650,
    },
    3: {
      r: 34.8,
      theta: PI,
      satDistance: { x: -34.8, y: 0 },
      period: 800,
    },
  },
};
