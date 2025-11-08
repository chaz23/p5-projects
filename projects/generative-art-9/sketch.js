new p5();

const rMax = 800;
const tMax = 100;
const thetaMax = 360;

const deltaR = 20;
const deltaTheta = 30;

const degToRad = (deg) => (deg * TWO_PI) / 360;

let flowfield = new Array(rMax / deltaR)
  .fill(0)
  .map(() =>
    new Array(thetaMax / deltaTheta).fill(0).map(() => new Array(tMax).fill(0))
  );

function setup() {
  createCanvas(rMax, rMax);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noLoop();
}

function draw() {
  background(290, 100, 0, 100);
  // background("hsla(198, 67%, 90%, 1.00)");

  for (let t = 0; t < tMax; t++) {
    for (let r = 0; r < rMax; r += deltaR) {
      for (let theta = 0; theta < thetaMax; theta += deltaTheta) {
        const resolution = 0.4;
        const rOff = r * resolution;
        const thetaOff = theta * resolution;
        const tOff = t * 0.005;
        const maxThetaPerturbation = 0;
        const angleDeg =
          theta +
          map(
            noise(rOff, thetaOff, tOff),
            0,
            1,
            -maxThetaPerturbation,
            maxThetaPerturbation
          );
        const mag = map(noise(tOff), 0, 1, 0.4, 0.7);
        const angle = degToRad(angleDeg);
        const v = createVector(cos(angle) * mag, sin(angle) * mag);
        flowfield[r / deltaR][theta / deltaTheta][t] = v.copy();
        push();
        translate(
          rMax / 2 + r * cos(degToRad(theta)),
          rMax / 2 + r * sin(degToRad(theta))
        );
        rotate(v.heading());
        pop();
        noStroke();
        fill(100, 20, 30, 60);
        rect(0, 0, 15, 5);
        // triangle(
        //   tileLength / 2,
        //   0,
        //   -tileLength / 2,
        //   tileLength,
        //   tileLength / 2,
        //   tileLength
        // );
      }
    }
  }

  const numCurves = 6000;
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
}
