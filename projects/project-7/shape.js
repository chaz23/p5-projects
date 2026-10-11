class Shape {
  constructor(x_, y_) {
    this.x = {
      circle: x_,
      rect: x_ - squareLength / 2,
      triangle: [
        x_ - squareLength * sin(30) * cos(30),
        x_,
        x_ + squareLength * sin(30) * cos(30),
      ],
    };
    this.y = {
      circle: y_,
      rect: y_ - squareLength / 2,
      triangle: [
        y_ - 2 * squareLength * sin(30) * cos(30),
        y_,
        y_ - 2 * squareLength * sin(30) * cos(30),
      ],
    };

    this.color = randomColor();
    this.hasFill = floor(random(0, 2));
    this.fill =
      this.hasFill === 0
        ? noFill()
        : fill(this.color[0], this.color[1], this.color[2]);
    this.stroke =
      floor(random(0, 2)) === 0
        ? noStroke()
        : stroke(this.color[0], this.color[1], this.color[2]);
  }

  circle() {
    circle(this.x.circle, this.y.circle, squareLength);
  }

  rect() {
    rect(this.x.rect, this.y.rect, squareLength, squareLength, 6);
  }

  quad() {
    const edgeCurve = 14;
    rect(
      this.x.rect,
      this.y.rect,
      squareLength,
      squareLength,
      random([0, edgeCurve]),
      random([0, edgeCurve]),
      random([0, edgeCurve]),
      random([0, edgeCurve])
    );
  }

  diamond() {
    push();
    const offset = squareLength / 2;
    rectMode(CENTER);
    translate(this.x.rect + offset, this.y.rect + offset);
    rotate(QUARTER_PI);
    rect(0, 0, squareLength / sqrt(2), squareLength / sqrt(2), 2);
    pop();
  }

  triangle() {
    triangle(
      this.x.triangle[0],
      this.y.triangle[0],
      this.x.triangle[1],
      this.y.triangle[1],
      this.x.triangle[2],
      this.y.triangle[2]
    );
  }

  randomShape() {
    const shapes = [
      this.circle.bind(this),
      this.rect.bind(this),
      this.quad.bind(this),
      this.diamond.bind(this),
      this.triangle.bind(this),
    ];

    const rand = floor(random(0, shapes.length));
    shapes[rand]();
  }

  render() {
    if (this.hasFill === 0) {
      circle(this.x.circle, this.y.circle, squareLength);
    } else {
      this.randomShape();
    }
  }
}
