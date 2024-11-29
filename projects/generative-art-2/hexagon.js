class Hexagon {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
  }

  render() {
    // 30, 90, 150, 210, 270, 330
    // 1 * 60 - 30
    const dist = 40;
    const vertices = Array.from({ length: 6 }, (d, i) => (i + 1) * 60 - 30);
    fill("black");
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
      line(
        this.x + dist * sin(vertices[i]),
        this.x + dist * cos(vertices[i]),
        this.x + dist * sin(vertices[i + 1]),
        this.x + dist * cos(vertices[i + 1])
      );
    }
    endShape();
    square(this.x, this.y, 100);
  }
}
