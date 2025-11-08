new p5();

const canvasLength = 800;

const numPoints = 1000;
const data = Array.from({ length: numPoints }, (_, i) => ({ x: 2, y: 3 }));

function setup() {
  pixelDensity(displayDensity());
  createCanvas(canvasLength, canvasLength);
  colorMode(HSB, 360, 100, 0, 100);
  rectMode(CENTER);
  noLoop();
}

function draw() {
  background(290, 10, 10, 100);

  translate(canvasLength / 2, canvasLength / 2);

  for (let i = 0; i < numPoints; i++) {
    circle(data[i].x, data[i].y, 20);
  }
}
