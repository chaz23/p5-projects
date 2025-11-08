new p5();

let palettes;
let colors;
const getRandomColor = () => `#${colors[random(d3.range(0, colors.length))]}`;

const width = windowWidth;
const height = windowHeight;

const rmax = width > height ? height / 2 : width / 2;
const scale = d3.scaleLinear().domain([0, 1]).range([0, rmax]);

const tileWidth = 80;
const xNumTiles = Math.ceil(width / tileWidth);
const xTileStart = tileWidth / 2 - (xNumTiles * tileWidth - width) / 2;
const yNumTiles = Math.ceil(height / tileWidth);
const yTileStart = tileWidth / 2 - (yNumTiles * tileWidth - height) / 2;

function preload() {
  palettes = loadJSON(
    "https://raw.githubusercontent.com/chaz23/p5-projects/refs/heads/main/palettes.json"
  );
}

function setup() {
  pixelDensity(2);
  colorMode(HSL, 360, 100, 100);
  rectMode(CENTER);
  angleMode(DEGREES);
  createCanvas(width, height);
  background(0, 0, 10);
  noLoop();

  colors = palettes[3];
}

function draw() {
  // push();
  // for (let i = 0; i < xNumTiles; i++) {
  //   for (let j = 0; j < yNumTiles; j++) {
  //     const t = new Tile(
  //       xTileStart + i * tileWidth,
  //       yTileStart + j * tileWidth,
  //       tileWidth
  //     );
  //     t.render();
  //   }
  // }
  // pop();

  const flower = [{ numPetals: 10 }, { numPetals: 8 }, { numPetals: 8 }];

  for (let i = 0; i < flower[0].numPetals; i++) {
    new Petal({
      petalLength: scale(0.65),
      ctrls: { ctrl1: scale(0.3), ctrl2: scale(0.1) },
      offsetWindow: scale(0),
      rotation: (360 / flower[0].numPetals) * i,
      alpha: 0.5,
      center: [width / 2, height / 2],
      fillInterpolator: d3.interpolatePiYG,
    }).render();
  }

  // stroke("white");
  // let x = 100;
  // for (let y = 10; y < 300; y++) {
  //   const n = noise(y) * 3;
  //   line(x, y, x + n, y + 1);
  //   x = x + n;
  // }
}
