new p5();

let palettes;
let colors;
const getRandomColor = () => `#${colors[random(d3.range(0, colors.length))]}`;

function preload() {
  palettes = loadJSON(
    "https://raw.githubusercontent.com/chaz23/p5-projects/refs/heads/main/palettes.json"
  );
}

const tileSize = 70;
const numTiles = {
  x: Math.floor(windowWidth / tileSize),
  y: Math.floor(windowHeight / tileSize),
};

const width = numTiles.x * tileSize;
const height = numTiles.y * tileSize;

function setup() {
  colorMode(HSL, 360, 100, 100);
  rectMode(CENTER);
  createCanvas(width, height);
  background(0, 0, 10);
  noLoop();

  colors = palettes[2];
}

function draw() {
  for (let i = 0; i < numTiles.x; i++) {
    for (let j = 0; j < numTiles.y; j++) {
      new Shape(i, j, tileSize).render();
    }
  }
}
