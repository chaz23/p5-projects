class Particle {
  constructor(x_, y_) {
    this.position = createVector(x_, y_);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(forcefield) {
    const i = floor(this.position.x / cellLength);
    const j = floor(this.position.y / cellLength);
    const force = createVector(forcefield[i][j].x, forcefield[i][j].y);
    this.acceleration.add(force);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(1);
    this.acceleration.mult(0);
  }

  display() {
    this.update();
    noStroke();
    fill(0, 20);
    ellipse(this.position.x, this.position.y, 20, 20);
  }
}
