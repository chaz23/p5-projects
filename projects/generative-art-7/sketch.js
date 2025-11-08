new p5();

const width = windowWidth;
const height = windowHeight;
const rMax = width > height ? height : width;
const x0 = width / 2;
const y0 = height / 2;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(width, height);
  angleMode(DEGREES);
  colorMode(360, 100, 100, 100);
  noLoop();
}

function draw() {
  background("white");
  strokeWeight(1);

  const numLines = 1000;
  for (let i = 0; i < 70; i++) {
    const r = 50 + i * 4;
    const rMin = r - i;
    const rMax = r + i;
    const noiseMax = map(i, 0, numLines, sin(270) + 1, sin(360) + 1) * 200;
    new Ring(x0, y0, rMin, rMax, 3).render();
  }
}
