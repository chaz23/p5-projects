new p5();

const width = windowWidth;
const height = windowHeight;

function setup() {
  colorMode(HSL, 360, 100, 100);
  createCanvas(width, height);
  noLoop();
}

function draw() {
  background(220, 100, 50);
  print(d3.range(0, 20));
}
