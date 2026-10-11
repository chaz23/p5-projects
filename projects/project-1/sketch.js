new p5();

const tilesPerSide = 50;

const canvasLength = windowWidth > windowHeight ? windowHeight : windowWidth;
const tileLength = canvasLength / tilesPerSide;

function setup() {
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  createCanvas(canvasLength, canvasLength);
  noLoop();
  background(20, 50, 80);
}

function draw() {
  stroke("black");
  strokeWeight(0.5);

  for (let x = 0; x < canvasLength; x += tileLength) {
    for (let y = 0; y < canvasLength; y += tileLength) {
      const res = 0.003;

      let xStart = x;
      let yStart = y;

      for (let i = 0; i < 40; i++) {
        const segLength = 5;
        const n = noise(xStart * res, yStart * res);
        const angle = map(n, 0.2, 0.8, 0, 360);
        const xEnd = cos(angle) * segLength + xStart;
        const yEnd = sin(angle) * segLength + yStart;
        line(xStart, yStart, xEnd, yEnd);
        xStart = xEnd;
        yStart = yEnd;
      }
    }
  }
}
