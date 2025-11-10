new p5();

const width = windowWidth;
const height = windowHeight;

const lineResolution = 1;
const lineSpacing = 50;
const numLines = 2; //Math.floor(height / lineSpacing);
const numNodes = Math.ceil(width / lineResolution);

let points = Array.from({ length: 4 }, () => ({
  lineNumber: d3.randomInt(numLines)() + 1,
  x: d3.randomInt(numNodes)() * lineResolution,
  mag: 60,
}))
  .map((d) => ({ ...d, y: d.lineNumber * lineSpacing }))
  .sort((a, b) =>
    a.lineNumber === b.lineNumber ? a.x - b.x : a.lineNumber - b.lineNumber
  );

for (let p = 0; p < points.length; p++) {
  for (let q = 0; q < p; q++) {
    const dist = {
      x: Math.abs(points[p].x - points[q].x),
      y: Math.abs((points[p].lineNumber - points[q].lineNumber) * lineSpacing),
    };
    const range = points[q].mag + dist.y;
    const isInRange = range > Math.sqrt(dist.x ** 2 + dist.y ** 2);

    if (isInRange) {
      const y = Math.sqrt(range ** 2 - dist.x ** 2) + points[q].y;
      points[p].y = y;
    }
  }
}

const line = d3
  .line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(d3.curveCatmullRom.alpha(0.5));

const curvePoints = line([
  { x: 3, y: 4 },
  { x: 5, y: 9 },
  { x: 5, y: 29 },
  { x: 50, y: 9 },
]);

const path = new Path2D(curvePoints);

const y = (x, lineNumber, points) => {
  const pointsInRange = points
    .filter((d) => d.lineNumber <= lineNumber)
    .filter((d) => {
      const dist = {
        x: Math.abs(x - d.x),
        y: Math.abs(lineNumber * lineSpacing - d.lineNumber * lineSpacing),
      };
      const range = d.mag + (lineNumber - d.lineNumber) * lineSpacing;
      const isInRange = range > Math.sqrt(dist.x ** 2 + dist.y ** 2);
      return isInRange;
    });

  const baseOffset = lineNumber * lineSpacing;

  if (pointsInRange.length > 0) {
    const perturbations = pointsInRange.map((d) => {
      const r0 = d.mag + (lineNumber - d.lineNumber) * lineSpacing;
      const x0 = Math.abs(x - d.x);
      return Math.sqrt(r0 ** 2 - x0 ** 2);
    });
    const totalPerturbations = perturbations.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    return baseOffset + totalPerturbations;
  } else {
    return baseOffset;
  }
};

function setup() {
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(220, 50, 60, 80);

  // for (let i = 0; i < points.length; i++) {
  //   circle(points[i].x, points[i].y, 20);
  //   push();
  //   noFill();
  //   for (let j = 0; j < numLines; j++) {
  //     circle(points[i].x, points[i].y, points[i].mag * 2 + j * lineSpacing * 2);
  //   }
  //   pop();
  // }

  // for (let lineNumber = 1; lineNumber <= numLines; lineNumber++) {
  //   const nodes = Array.from({ length: numNodes }, (_, i) => {
  //     const x = i * lineResolution;
  //     return {
  //       x: x,
  //       y: y(x, lineNumber, points),
  //     };
  //   });

  //   // beginShape();
  //   for (let i = 0; i < nodes.length; i++) {
  //     circle(nodes[i].x, nodes[i].y, 5);
  //     // vertex(nodes[i].x, nodes[i].y);
  //   }
  //   // endShape();
  // }

  drawingContext.lineWidth = 1;
  drawingContext.stroke(path);
}
