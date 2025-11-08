new p5();

const canvasLength = windowWidth > windowHeight ? windowHeight : windowWidth;
const numTiles = 50;
const tileLength = canvasLength / numTiles;

const tMax = 100;
let flowfield = new Array(numTiles)
  .fill(0)
  .map(() => new Array(numTiles).fill(0).map(() => new Array(tMax).fill(0)));

function setup() {
  pixelDensity(displayDensity());
  createCanvas(canvasLength, canvasLength);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noLoop();
}

function draw() {
  background(290, 100, 0, 100);

  // const fromAngle = (angle, mag = 1) => ({
  //   x: mag * sketch.cos(angle),
  //   y: mag * sketch.sin(angle),
  //   heading() {
  //     return sketch.atan2(this.y, this.x);
  //   },
  // });

  for (let t = 0; t < tMax; t++) {
    for (let x = 0; x < numTiles; x++) {
      for (let y = 0; y < numTiles; y++) {
        const resolution = 0.4;
        const xOff = x * resolution;
        const yOff = y * resolution;
        const tOff = t * 0.005;

        const angle = noise(xOff, yOff, tOff) * TWO_PI;

        const v = p5.Vector.fromAngle(angle);
        v.setMag(map(noise(tOff), 0, 1, 0.4, 0.7));
        flowfield[x][y][t] = v;
        // const mag = p.map(p.noise(tOff), 0, 1, 0.4, 0.7);
        // const v = p.createVector(p.cos(angle) * mag, p.sin(angle) * mag);
        // flowfield[x][y][t] = v.copy();

        push();
        translate(x * tileLength, y * tileLength);
        rotate(v.heading());
        pop();
      }
    }
  }

  const numCurves = 12000;
  let curves = Array(numCurves);
  for (let curve = 0; curve < numCurves; curve++) {
    curves[curve] = new Curve();
  }

  for (let t = 0; t < tMax; t++) {
    for (let curve = 0; curve < numCurves; curve++) {
      curves[curve].update();
      curves[curve].follow(flowfield, t);
      curves[curve].render();
    }
  }

  const rStart = floor(canvasLength * 0.9);
  const rEnd = floor(canvasLength * 1.1);
  translate(canvasLength / 2, canvasLength / 2);
  for (let r = rStart; r < rEnd; r += 0.5) {
    noFill();
    stroke(0, 0, 0, map(r, rStart, rEnd, 0, 100));
    strokeWeight(1);
    rect(0, 0, r);
  }
}
