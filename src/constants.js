export const PI = Math.PI;

export const satellite_init = {
  outerSats: {
    1: {
      r: 22,
      theta: 0.5 * PI,
      satDistance: { x: 0, y: 24.8 },
      period: 600,
    },
    2: {
      r: 30,
      theta: (4 / 3) * PI,
      satDistance: { x: -17.4, y: -30.14 },
      period: 800,
    },
    3: {
      r: 36,
      theta: (5 / 3) * PI,
      satDistance: { x: 23.65, y: -40.96 },
      period: 1000,
    },
  },
  midSats: {
    1: {
      r: 16,
      theta: PI,
      satDistance: { x: -22.8, y: 0 },
      period: 500,
    },
    2: {
      r: 22,
      theta: 0,
      satDistance: { x: 32.3, y: 0 },
      period: 650,
    },
    3: {
      r: 30,
      theta: 0.5 * PI,
      satDistance: { x: 0, y: 36.3 },
      period: 950,
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

export const floatDetail = {
  digiiNote: {
    left: {
      about:
        "A tool to automatically convert images of text, handwritten or typed, into a copy-pasteable snippet. Implements Google's Cloud Vision API to perform Optical Character Recognition, a machine learning algorithm which detects text in images.",
      stack: [
        'React',
        'Firebase',
        'Node',
        'Google Cloud Functions',
        'Cloud Vision API',
        'OAuth2.0',
        'Bootstrap',
      ],
    },
    right: {
      topics: [
        'NoSQL database',
        'serverless cloud functions',
        'machine learning',
        'character recognition',
      ],
      github: 'https://github.com/jdraper9/digi-dopple',
    },
  },
  resourceRepo: {
    left: {
      about:
        'A place for teachers to organize links to online resources such as informational websites, tutorials, or videos. Resources can be searched by tags',
      stack: ['Ruby on Rails', 'PostgreSQL', 'bCrypt'],
    },
    right: {
      topics: ['CRUD App', 'REST', 'User password encryption', 'SQL databse'],
      github: 'https://github.com/jdraper9/resource-repository-app',
    },
  },
  pathfinder: {
    left: {
      about:
        "A web app that visualizes three pathfinding algorithms. Learned how to do Dijkstra's from a tutorial, then implented A* and Depth First Search from pseudocode.",
      stack: ['React'],
    },
    right: {
      topics: ['Algorithms', 'CSS Animation', 'Pathfinding AI'],
      github: 'https://github.com/jdraper9/Pathfinding-Visualizer',
    },
  },
};

export const _defaultState = {
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
  //
};
