new p5();

let palettes;
let colors;
const getRandomColor = () => `#${colors[random(d3.range(0, colors.length))]}`;

function preload() {
  palettes = loadJSON(
    "https://raw.githubusercontent.com/chaz23/p5-projects/refs/heads/main/palettes.json"
  );
}

function setup() {
  colors = palettes[7];

  colorMode(HSL, 360, 100, 100);
  rectMode(CENTER);

  createCanvas(width, height);
  background(0, 0, 10);
  noLoop();
}

function draw() {
  background(220);
}
