new p5();

const tilesPerSide = 30;

const canvasLength = windowWidth > windowHeight ? windowHeight : windowWidth;
const squareLength = canvasLength / tilesPerSide;

function randomColor() {
  const numColors = palette.length;
  const idx = floor(random(0, numColors));
  return palette[idx].hsb;
}

function getPixelIdx(x, y) {
  const d = pixelDensity();
  return 4 * d * (x + y * canvasLength);
}

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(canvasLength, canvasLength);
  background(40, 30, 100);
  strokeWeight(1.3);
  noLoop();
}

function draw() {
  for (let x = 0; x <= tilesPerSide; x++) {
    for (let y = 0; y <= tilesPerSide; y++) {
      new Shape(x * squareLength, y * squareLength).render();
      noFill();
      square(x * squareLength, y * squareLength, squareLength);
    }
  }

  let offset = 0.1;
  let y1 = Array(canvasLength);
  let y2 = Array(canvasLength);

  for (let x = 0; x < canvasLength; x++) {
    y1[x] = canvasLength / 1 + map(noise(offset), 0, 1, 0, 250) - x / 2;
    y2[x] = canvasLength / 0.85 + map(noise(offset), 0, 1, 0, 550) - x / 1.6;
    offset += 0.0035;
  }

  y1 = y1.map((d) => floor(d));
  y2 = y2.map((d) => floor(d));

  loadPixels();
  let colorPix = pixels;

  filter(GRAY);

  loadPixels();
  let greyPix = pixels;

  for (let x = 0; x < canvasLength; x++) {
    for (let y = y1[x]; y < y2[x]; y++) {
      const startIdx = getPixelIdx(x, y);

      Array.from(
        { length: 16 },
        (d, i) => (colorPix[startIdx + i] = greyPix[startIdx + i])
      );
    }
  }

  for (let i = 0; i < pixels.length; i++) {
    pixels[i] = colorPix[i];
  }
  updatePixels();
}
