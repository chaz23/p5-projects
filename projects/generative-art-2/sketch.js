function setup() {
  angleMode(DEGREES);
  createCanvas(600, 600);
}

function draw() {
  background(220);
  const hex = new Hexagon(200, 100);
  hex.render();
  noLoop();
}
