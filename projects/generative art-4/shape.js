class Shape {
  constructor(_i, _j, _tileSize) {
    this.tileSize = _tileSize;
    this.x = (_i + 1 / 2) * this.tileSize;
    this.y = (_j + 1 / 2) * this.tileSize;
  }

  circle() {
    // const radius;
    strokeWeight(random([0, 20]));
    fill(getRandomColor());
    circle(this.x, this.y, this.tileSize);
  }

  render() {
    // square(this.x, this.y, this.tileSize);
    this.circle();
  }
}
