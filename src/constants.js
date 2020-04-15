export const PI = Math.PI;

export const satellite_init = {
  outerSats: {
    1: {
      r: 22,
      theta: 0.5 * PI,
      satDistance: { x: 0, y: 24.8 },
      period: 400,
    },
    2: {
      r: 30,
      theta: (4 / 3) * PI,
      satDistance: { x: -17.4, y: -30.14 },
      period: 600,
    },
    3: {
      r: 36,
      theta: (5 / 3) * PI,
      satDistance: { x: 23.65, y: -40.96 },
      period: 800,
    },
  },
  midSats: {
    1: {
      r: 16,
      theta: PI,
      satDistance: { x: -22.8, y: 0 },
      period: 450,
    },
    2: {
      r: 22,
      theta: 0,
      satDistance: { x: 32.3, y: 0 },
      period: 600,
    },
    3: {
      r: 30,
      theta: 0.5 * PI,
      satDistance: { x: 0, y: 36.3 },
      period: 900,
    },
  },
  innerSats: {
    1: {
      r: 14,
      theta: (1 / 3) * PI,
      satDistance: { x: 9.9, y: 17.15 },
      period: 400,
    },
    2: {
      r: 20,
      theta: (3 / 2) * PI,
      satDistance: { x: 0, y: -29.8 },
      period: 650,
    },
    3: {
      r: 25,
      theta: PI,
      satDistance: { x: -34.8, y: 0 },
      period: 800,
    },
  },
};

export const particles_init = {
  1: { coordinates: { x: 244.5, y: 249.5 }, endPoint: { x: 200, y: 210 } },
  2: { coordinates: { x: 236.5, y: 268.5 }, endPoint: { x: 215, y: 300 } },
  3: { coordinates: { x: 254.5, y: 246.5 }, endPoint: { x: 300, y: 210 } },
  4: { coordinates: { x: 263.5, y: 233.5 }, endPoint: { x: 275, y: 200 } },
  5: { coordinates: { x: 234.5, y: 236.5 }, endPoint: { x: 220, y: 200 } },
  6: { coordinates: { x: 226.5, y: 246.5 }, endPoint: { x: 200, y: 230 } },
  7: { coordinates: { x: 270.5, y: 245.5 }, endPoint: { x: 300, y: 235 } },
  8: { coordinates: { x: 249.5, y: 263.5 }, endPoint: { x: 250, y: 300 } },
  9: { coordinates: { x: 265.5, y: 268.5 }, endPoint: { x: 285, y: 300 } },
  yellow: { coordinates: { x: 235.5, y: 255.5 }, endPoint: { x: 190, y: 280 } },
  blue: { coordinates: { x: 262, y: 257 }, endPoint: { x: 305, y: 285 } },
  green: { coordinates: { x: 249, y: 234 }, endPoint: { x: 255, y: 200 } },
};
