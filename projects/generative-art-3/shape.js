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
      // triangle: [y_ + squareLength / 2, y_, y_ + squareLength / 2],
      triangle: [
        y_ - 2 * squareLength * sin(30) * cos(30),
        y_,
        y_ - 2 * squareLength * sin(30) * cos(30),
      ],
    };

    this.color = getColor();
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

  shapeSelector() {
    const rand = floor(random(0, 4));
    let shape;

    if (rand === 0) {
      shape = circle(this.x.circle, this.y.circle, squareLength);
    } else if (rand === 1) {
      shape = rect(this.x.rect, this.y.rect, squareLength, squareLength, 7);
    } else if (rand === 2) {
      shape = rect(
        this.x.rect,
        this.y.rect,
        squareLength,
        squareLength,
        random([0, 7]),
        random([0, 7]),
        random([0, 7]),
        random([0, 7])
      );
    } else {
      shape = triangle(
        this.x.triangle[0],
        this.y.triangle[0],
        this.x.triangle[1],
        this.y.triangle[1],
        this.x.triangle[2],
        this.y.triangle[2]
      );
    }
    return shape;
  }

  render() {
    // fill("blue");
    // circle(this.x.circle, this.y.circle, squareLength);
    // strokeWeight(1.9);
    // // this.stroke;
    // // this.fill;

    if (this.hasFill === 0) {
      circle(this.x.circle, this.y.circle, squareLength);
    } else {
      this.shapeSelector();
      // noStroke();
      // circle(this.x.circle, this.y.circle, squareLength);
      // rect(this.x.rect, this.y.rect, squareLength, squareLength, 7);
      // rect(
      //   this.x.rect,
      //   this.y.rect,
      //   squareLength,
      //   squareLength,
      //   7,
      //   0,
      //   7,
      //   0
      // );
      // triangle(
      //   this.x.triangle[0],
      //   this.y.triangle[0],
      //   this.x.triangle[1],
      //   this.y.triangle[1],
      //   this.x.triangle[2],
      //   this.y.triangle[2]
      // );
    }
    // circle(this.x, this.y, squareLength);
    // console.log(this.x.circle);
    // if (this.hasFill === 1) {
    //   rectMode(circle);
    //   rect(this.x.circle, this.y.circle, squareLength);
    //   rectMode(rect);
    // }
  }
}
