class Shape {
  constructor(_i, _j, _tileSize) {
    this.tileSize = _tileSize;
    this.x = (_i + 1 / 2) * this.tileSize;
    this.y = (_j + 1 / 2) * this.tileSize;
  }

  circle() {
    fill(getRandomColor());
    stroke(getRandomColor());
    strokeWeight(random([0, 10]));

    if (random([0, 1]) === 0) {
      noFill();
    } else {
      noStroke();
    }

    const radius = random(this.tileSize * 0.5, this.tileSize * 0.95);
    circle(this.x, this.y, radius);
  }

  rect() {
    fill(getRandomColor());
    stroke(getRandomColor());
    strokeWeight(random([0, 10]));

    if (random([0, 1]) === 0) {
      noFill();
    } else {
      noStroke();
    }

    rect(this.x, this.y, this.tileSize, this.tileSize);
  }

  render() {
    fill(getRandomColor());
    square(this.x, this.y, this.tileSize);
    fill(getRandomColor());
    stroke(getRandomColor());
    noStroke();
    strokeWeight(random([0, 10]));

    // if (random([0, 1]) === 0) {
    //   noFill();
    // } else {
    //   noStroke();
    // }

    const radius = random(this.tileSize * 0.5, this.tileSize * 0.9);

    push();

    beginClip();
    square(this.x, this.y, this.tileSize);
    endClip();

    translate(
      random([0, 0, 0, -this.tileSize / 2, this.tileSize / 2]),
      random([0, 0, 0, -this.tileSize / 2, this.tileSize / 2])
    );
    circle(this.x, this.y, radius);
    pop();
  }
}
