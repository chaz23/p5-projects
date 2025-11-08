class Curve {
  constructor() {
    this.lifespan = random(80, 200);
    this.isInFocus = true;
    this.isDead = false;

    this.pos = createVector(rMax / 2, rMax / 2);
    this.posOld;
    this.vel = createVector(
      d3.randomUniform(-0.8, 0.8)(),
      d3.randomUniform(-0.8, 0.8)()
    );
    this.acc = createVector(0, 0);

    this.maxSpeed = 2.2;

    this.strokeColor = random([
      color(0, 90, 80, 4),
      color(80, 90, 80, 3),
      color(250, 90, 80, 4),
    ]);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.posOld = this.pos.copy();
    this.pos.add(this.vel);

    this.acc.mult(0);

    this.lifespan = this.lifespan > 0 ? this.lifespan - 1 : this.lifespan;
    this.isInFocus =
      (this.pos.x > 0) &
      (this.pos.x < rMax) &
      (this.pos.y > 0) &
      (this.pos.y < rMax);
    this.isDead = (this.lifespan > 0) & this.isInFocus ? false : true;
  }

  perturb(force) {
    this.acc.add(force);
  }

  follow(flowfield, t) {
    if (!this.isDead) {
      const r = Math.sqrt(this.pos.x ^ (2 + this.pos.y) ^ 2);
      const rFloored = r - (r % deltaR);
      const theta = (atan2(this.pos.y, this.pos.x) * 180) / PI;
      const thetaFloored = theta - (theta % deltaTheta);
      const force = flowfield[rFloored / deltaR][thetaFloored / deltaTheta][t];

      this.perturb(force);
    }
  }

  render() {
    if (!this.isDead) {
      push();
      stroke(this.strokeColor);
      strokeWeight(2.2);
      line(this.posOld.x, this.posOld.y, this.pos.x, this.pos.y);
      pop();
    }
  }
}
