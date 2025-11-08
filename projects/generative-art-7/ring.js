class Ring {
  constructor(_x0, _y0, _rMin, _rMax, _noiseMax) {
    this.x0 = _x0;
    this.y0 = _y0;
    this.rMin = _rMin;
    this.rMax = _rMax;
    this.noiseMax = _noiseMax;
  }

  render() {
    noFill();

    push();
    translate(this.x0, this.y0);

    beginShape();
    const offset = random(0, 360);
    for (let theta = 0; theta <= 360; theta++) {
      const xOff = map(sin(theta + offset), -1, 1, 0, this.noiseMax);
      const yOff = map(cos(theta + offset), -1, 1, 0, this.noiseMax);
      const r = map(noise(xOff, yOff), 0, 1, this.rMin, this.rMax);

      vertex(r * cos(theta), r * sin(theta));
    }
    endShape();
    pop();
  }
}
