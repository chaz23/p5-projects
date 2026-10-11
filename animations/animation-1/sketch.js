new p5();

const width = windowWidth > windowHeight ? windowHeight : windowWidth;
const numTiles = 40;
const tileWidth = width / numTiles;

let numFrames = 30;

const period = (t) => {
  const f = sin(TWO_PI * t);
  const pos = map(f, -1, 1, 0.3, 0.8);
  return pos;
};

const offset = (x, y) => {
  return 0.03 * dist(x, y, width / 2, width / 2);
};

function setup() {
  createCanvas(width, width);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  frameRate(30);
}

function draw() {
  clear();
  background(220, 20, 0, 100);

  const t = frameCount / numFrames;

  for (let ix = 0; ix < numTiles; ix++) {
    for (let iy = 0; iy < numTiles; iy++) {
      const x = (ix + 0.5) * tileWidth;
      const y = (iy + 0.5) * tileWidth;
      const r = period(t - offset(x, y));

      circle(x * period(t), y * period(t), 8);
    }
  }
}
