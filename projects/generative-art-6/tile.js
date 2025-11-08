class Tile {
  constructor(_x, _y, _l) {
    this.x = _x;
    this.y = _y;
    this.l = _l;
    this.ctrls = { ctrl1: this.l * 0.15, ctrl2: this.l * 0.1 };
  }

  drawPetal() {
    beginShape();
    vertex(0, 0);
    bezierVertex(
      -this.ctrls.ctrl1,
      this.l * 0.4 * 0.3,
      -this.ctrls.ctrl2,
      this.l * 0.4 * 0.6,
      0,
      this.l * 0.4
    );
    bezierVertex(
      this.ctrls.ctrl2,
      this.l * 0.4 * 0.6,
      this.ctrls.ctrl1,
      this.l * 0.4 * 0.3,
      0,
      0
    );
    endShape();
  }

  render() {
    stroke(200, 3, 15);
    noFill();
    rect(this.x, this.y, this.l);

    stroke(random(0, 360), random(40, 90), random(10, 60), 0.4);
    const flower = [
      { numPetals: Math.floor(random(6, 12)) },
      { numPetals: 8 },
      { numPetals: 8 },
    ];

    for (let i = 0; i < flower[0].numPetals; i++) {
      push();
      translate(this.x, this.y);
      rotate((360 / flower[0].numPetals) * i);
      this.drawPetal();
      pop();
    }
  }
}
