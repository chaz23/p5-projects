new p5();
angleMode(DEGREES);

// Canvas.
const cellLength = 50;
const canvasWidth =
  windowHeight > windowWidth
    ? Math.floor(windowWidth / cellLength) * cellLength
    : Math.floor(windowHeight / cellLength) * cellLength;
const numCells = canvasWidth / cellLength;

// Grid.
let grid = [];
let angle = 45;
let distToDiag = [];
for (let i = 0; i < numCells; i++) {
  distToDiag[i] = [];
  for (let j = 0; j < numCells; j++) {
    distToDiag[i][j] = Math.abs(i - j) * cos(45);
  }
}

// Noise.
let xOffset = 0;
let yOffset = 0;

let particle;

/* ---- SETUP ---- */
function setup() {
  createCanvas(canvasWidth, canvasWidth);
  particle = new Particle(300, 50);
  background("white");
}

/* ---- DRAW ---- */
function draw() {
  for (let i = 0; i < numCells; i++) {
    grid[i] = [];
    for (let j = 0; j < numCells; j++) {
      // square(i * cellLength, j * cellLength, cellLength);
      // text(distToDiag[i][j], i * cellLength, j * cellLength);
      const xNoise = sin(xOffset) * (1 + distToDiag[i][j]);
      const yNoise = cos(yOffset) * (1 + distToDiag[i][j]);
      grid[i][j] = createVector(sin(angle + xNoise), cos(angle + yNoise));
      // line(
      //   i * cellLength,
      //   j * cellLength,
      //   cellLength * (i + grid[i][j].x),
      //   cellLength * (j + grid[i][j].y)
      // );
      yOffset += 0.01;
    }
    xOffset += 0.01;
  }
  particle.applyForce(grid);
  particle.display();
  // noLoop();
}
