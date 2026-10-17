new p5();

function keyPressed() {
  if (key === "s") {
    saveCanvas("eye-of-god", "png");
  }
}

//#region Constants

const dimension = 8; // length of the finished artwork in inches
const resolution = 300; // pixels per inch
const length = 4000; // dimension * resolution

const rCross = length * 0.28;
const daysInLunarMonth = 28;

const purples = d3.schemeRdPu[9];
const greens = d3.schemeYlGn[9];
const blues = d3.schemeBlues[9];
const oranges = d3.schemeYlOrRd[9];

//#region Functions

const randomSkipBetween = (min, max) => {
  if (max === undefined) {
    return min;
  } else {
    return floor(random(min, max));
  }
};

const setStrokeWeight = (weight) => strokeWeight(weight * length * 0.0012);

// ----------------------------------------------------------------------------

//#region Setup

function setup() {
  createCanvas(length, length);

  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);

  noLoop();

  pixelDensity(displayDensity());
  // pixelDensity(1);
  background(0, 0, 10);
}

// ----------------------------------------------------------------------------

//#region Draw

function draw() {
  translate(length / 2, length / 2);

  // Draw suns
  // push();
  // for (let suns = 0; suns < 13; suns++) {
  //   rotate(360 / 13);
  //   push();
  //   translate(0, length * 0.4);
  //   new Sun(length * 0.03).render();
  //   pop();
  // }
  // pop();

  push();
  translate(length / 2, length - 50);
  new Temple().render();
  pop();

  // Draw center spokes
  push();
  stroke(0, 0, 50);
  setStrokeWeight(0.5);
  new Cross(28, rCross, 0.02).render();
  pop();

  // Draw rings.
  const rings = [
    { color: "white", height: 0.99, skip: 0, offset: 0, numRings: 3 },
    { color: "white", height: 0.95, skip: 4, offset: 0, numRings: 3 },
    { color: blues[3], height: 0.933, skip: 4, offset: 0, numRings: 3 },
    { color: blues[7], height: 0.98, skip: 9, offset: 0, numRings: 8 },
    { color: greens[5], height: 0.98, skip: 9, offset: 1, numRings: 6 },
    { color: purples[7], height: 0.77, skip: 0, offset: 1, numRings: 4 },
    { color: purples[5], height: 0.745, skip: 0, offset: 0, numRings: 2 },
    { color: greens[5], height: 0.68, skip: 9, offset: 0, numRings: 6 },
    { color: greens[2], height: 0.68, skip: 9, offset: 1, numRings: 6 },
    { color: oranges[4], height: 0.95, skip: 6, offset: 0, numRings: 10 },
    { color: color(0, 0, 15), height: 0.927, skip: 6, offset: 0, numRings: 2 },
    { color: blues[5], height: 0.917, skip: 4, offset: 0, numRings: 3 },
    { color: oranges[2], height: 0.81, skip: 6, offset: 0, numRings: 2 },
    { color: purples[2], height: 0.55, skip: 8, offset: 0, numRings: 4 },
    { color: purples[6], height: 0.28, skip: 12, offset: 1, numRings: 4 },
    { color: "white", height: 0.28, skip: 6, offset: 0, numRings: 5 },
    { color: "white", height: 0.28, skip: 6, offset: 0, numRings: 5 },
    { color: purples[3], height: 0.24, skip: 8, offset: 0, numRings: 4 },
    { color: purples[5], height: 0.2, skip: 12, offset: 1, numRings: 12 },
  ];

  for (const ring of rings) {
    stroke(ring.color);

    new Rings({
      numCrosses: 28,
      height: rCross * ring.height,
      skip: randomSkipBetween(ring.skip),
      offset: ring.offset,
    }).render(ring.numRings);
  }

  // Draw moons
  push();
  for (let day = 0; day < daysInLunarMonth; day++) {
    const r = length * 0.32;
    const x = r * cos((day / daysInLunarMonth) * 360 - 90);
    const y = r * sin((day / daysInLunarMonth) * 360 - 90);
    new Moon(x, y, length * 0.026, day).render();
  }
  pop();

  // Side strips

  noStroke();
  fill(greens[2]);
  rect(0, length * 0.451, length * 1.2, length * 0.004);

  push();
  fill(purples[6]);
  translate(-length / 2, -length / 2);
  rotate(45);
  for (let y = -100; y < length + 100; y += length * 0.03) {
    push();
    translate(length * 0.065, y * sin(45));
    const len = length * 0.015;
    rect(y * cos(45), 0, len, len);
    pop();
  }
  pop();

  fill(purples[6]);
  rect(0, -length * 0.451, length * 1.2, length * 0.004);
  fill(purples[6]);
  rect(-length * 0.43, 0, length * 0.03, length * 1.2);
  rect(-length * 0.454, 0, length * 0.005, length * 1.2);
  fill(greens[2]);
  rect(length * 0.43, 0, length * 0.03, length * 1.2);
  rect(length * 0.454, 0, length * 0.005, length * 1.2);

  push();
  fill(greens[2]);
  translate(-length / 2, -length / 2);
  rotate(45);
  for (let y = -1000; y < length + 100; y += length * 0.03) {
    push();
    translate(length * 1.349, y * sin(45));
    const len = length * 0.015;
    rect(y * cos(45), 0, len, len);
    pop();
  }
  pop();
}

// ----------------------------------------------------------------------------

//#region Cross

class Cross {
  constructor(n, r, s) {
    this.numCrosses = n;
    this.radius = r;
    this.strokeWeightRatio = s;
  }

  render() {
    push();
    strokeCap(ROUND);
    for (let cross = 0; cross < this.numCrosses; cross++) {
      const theta = 360 / this.numCrosses;
      for (let r = 0; r < this.radius; r++) {
        setStrokeWeight((r + 10) * this.strokeWeightRatio);
        line(
          r * cos(theta),
          r * sin(theta),
          (r + 1) * cos(theta),
          (r + 1) * sin(theta),
        );
      }
      rotate(360 / this.numCrosses);
    }
    pop();
  }
}

//#region Rings

class Rings {
  constructor({ numCrosses, height, offset = 0, skip = 0 }) {
    this.numCrosses = numCrosses;
    this.height = height;
    this.offset = offset;
    this.skip = skip;

    this.gapRatio = 0.0017;

    this.gcd = (a, b) => {
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
      return a;
    };
  }

  render(numRings) {
    const deltaTheta = (360 * (this.skip + 1)) / this.numCrosses;
    const numSteps = this.numCrosses / this.gcd(this.numCrosses, this.skip + 1);

    push();

    if (this.offset !== 0) {
      rotate((this.offset / this.numCrosses) * 360);
    }

    for (let n = 0; n < numRings; n++) {
      const x0 = 0;
      const y0 = -this.height + length * n * this.gapRatio;

      const radius = this.height - length * n * this.gapRatio;
      const x1 = radius * sin(deltaTheta);
      const y1 = -radius * cos(deltaTheta);

      push();

      for (let i = 0; i < numSteps; i++) {
        rotate(deltaTheta);

        push();
        stroke(0, 0, 0, 255);
        setStrokeWeight(1.7);
        line(x0, y0, x1, y1);
        pop();

        setStrokeWeight(0.77);
        line(x0, y0, x1, y1);
      }

      pop();
    }

    pop();
  }
}

//#region Moons

class Moon {
  constructor(_cx, _cy, _r, _day) {
    this.cx = _cx;
    this.cy = _cy;
    this.d = _r * 2;
    this.day = _day;
  }

  render() {
    push();

    // Moon background
    const f = [this.day]
      .map((d) => (d < 11 ? d + 28 : d))
      .map((d) => (d < 25 ? map(d, 11, 24, 0, 1) : map(d, 25, 38, 1, 0)))
      .map((d) => d3.interpolateRgb(greens[3], purples[6])(d * 0.8));
    fill(f);
    stroke(0, 0, 90, 210);
    strokeWeight(0.1);
    circle(this.cx, this.cy, this.d);

    // Inner design
    // stroke(40, 100, 100);
    // line(-this.d / 2, 0, this.d / 2, 0);

    // Shadow
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(this.cx, this.cy, this.d / 2, 0, TWO_PI);
    drawingContext.clip();
    noStroke();
    fill(0, 0, 0);
    circle(this.cx - this.d + this.day * (this.d / 14), this.cy, this.d);
    drawingContext.restore();

    pop();
  }
}

//#region Sun

class Sun {
  constructor(radius) {
    this.radius = radius;
    this.numNoiseRings = 300;
  }

  render() {
    noStroke();

    for (let i = 0; i < this.numNoiseRings; i++) {
      let phase = 0;
      noiseSeed(random(0, 100000));
      const maxNoise = 10;
      const hue = random(0, 60);

      fill(hue, random(60, 100), 100, 20);

      beginShape();
      for (let theta = 0; theta < 360; theta += 1) {
        let xOff = map(cos(theta + phase), -1, 1, 0, maxNoise);
        let yOff = map(sin(theta + phase), -1, 1, 0, maxNoise);
        let r = map(noise(xOff, yOff), 0, 1, 0.5, 1) * this.radius;
        let x = r * cos(theta);
        let y = r * sin(theta);
        vertex(x, y);
      }
      endShape(CLOSE);
      phase += 0.3;
    }
  }
}

//#region Temple

class Temple {
  constructor() {
    this.baseLength = length * 0.4;
    this.baseMaxWeight = 3;
    this.baseMinWeight = 0.5;
    this.stepGap = length * 0.003;
    this.stepSize = length * 0.01;
    this.drawSlab = (baseLength, height, slope) => {
      beginShape();
      vertex(-baseLength / 2, 0);
      vertex(-baseLength / 2 + height * tan(slope), -height);
      vertex(baseLength / 2 - height * tan(slope), -height);
      vertex(baseLength / 2, 0);
      endShape(CLOSE);
    };
  }

  render() {
    stroke(0, 0, 90);

    const baseWeightDiff = this.baseMaxWeight - this.baseMinWeight;
    for (let x = -this.baseLength / 2; x < this.baseLength / 2; x++) {
      const weight =
        x < 0
          ? this.baseMaxWeight +
            lerp(0, baseWeightDiff, x / (this.baseLength / 2))
          : this.baseMaxWeight -
            lerp(0, baseWeightDiff, x / (this.baseLength / 2));
      setStrokeWeight(weight);
      line(x, 0, x + 1, 0);
    }

    stroke("black");
    translate(0, -this.stepGap);
    this.drawSlab(this.baseLength * 0.6, this.baseLength * 0.03, 0);
    translate(0, -this.stepGap - this.stepSize);
    this.drawSlab(this.baseLength * 0.5, this.baseLength * 0.03, 0);
    translate(0, -this.stepGap);
    this.drawSlab(this.baseLength * 0.4, this.baseLength * 0.03, 0);
    this.drawSlab(200, 60, 30);
  }
}

function keyTyped() {
  if (key === "s") saveCanvas("project-8.png");
}
