class Tile {
  constructor(_i, _j, _tileSize) {
    this.tileSize = _tileSize;
    this.x = (_i + 1 / 2) * this.tileSize;
    this.y = (_j + 1 / 2) * this.tileSize;
    this.numCircles = random([1, 1, 1, , 2]);
  }

  drawCircle(x, y, r, tileSize) {
    if (random([0, 1]) === 0) {
      noFill();
      stroke(getRandomColor());
    } else {
      fill(getRandomColor());
      noStroke();
    }

    translate(
      random([0, 0, -tileSize / 2, tileSize / 2]),
      random([0, 0, -tileSize / 2, tileSize / 2])
    );
    strokeWeight(random([0, 10]));
    circle(x, y, r);
  }

  render() {
    // Draw the background square.
    fill(getRandomColor());
    noStroke();
    square(this.x, this.y, this.tileSize);

    const radius = random(this.tileSize * 0.5, this.tileSize * 0.9);

    // Draw the masked shapes.
    push();

    // Draw the mask.
    beginClip();
    square(this.x, this.y, this.tileSize);
    endClip();

    // Draw the backing shape.
    for (let i = 0; i < this.numCircles; i++) {
      this.drawCircle(this.x, this.y, radius, this.tileSize);
    }
    pop();
  }
}
