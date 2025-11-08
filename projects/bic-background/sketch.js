new p5();

const width = windowWidth;
const height = windowHeight;

const fillIncrementer = d3.scaleLinear().domain([0, 1]).range([0.015, 0.025]);
const fillInterpolator = d3.scaleLinear().domain([-1, 1]).range([0.3, 0.8]);
const fill = (t) => d3.interpolateRdPu(fillInterpolator(Math.sin(t)));

const numCells = 2000;

let data = Array.from({ length: numCells }, () => ({
  x: d3.randomInt(0, Math.floor(width))(),
  y: d3.randomInt(0, Math.floor(height))(),
  t: d3.scaleLinear().domain([0, 1]).range([0, 4])(Math.random()),
  incrementer: fillIncrementer(Math.random()),
}));

const voronoi = d3.Delaunay.from(
  data,
  (d) => d.x,
  (d) => d.y
).voronoi([0, 0, width, height]);

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(width, height);
}

function draw() {
  const ctx = canvas.getContext("2d");

  data.map((d, i) => {
    const bounds = voronoi.renderCell(i);
    const path = new Path2D(bounds);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke(path);
    ctx.fillStyle = fill(d.t);
    ctx.fill(path);
  });

  data = data.map((d) => ({ ...d, t: d.t + d.incrementer }));
}

function keyPressed() {
  if (key === "s") {
    saveGif("background-animation.gif", 5);
  }
}
