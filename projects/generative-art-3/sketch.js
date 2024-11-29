new p5();

/* Constants. */
const tilesPerSide = 20;

/* Draw. */
const canvasLength = windowWidth > windowHeight ? windowHeight : windowWidth;
const squareLength = canvasLength / tilesPerSide;

function getColor() {
  const numColors = palette.length;
  const idx = floor(random(0, numColors));
  return palette[idx].hsb;
}

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(canvasLength, canvasLength);
  background(40, 20, 100);
  noLoop();
  randomSeed(123);
}

function draw() {
  for (let x = 0; x <= tilesPerSide; x++) {
    for (let y = 0; y <= tilesPerSide; y++) {
      noFill();
      // strokeWeight(1);
      // stroke("black");
      square(x * squareLength, y * squareLength, squareLength);
      new Shape(x * squareLength, y * squareLength).render();
    }
  }
}
