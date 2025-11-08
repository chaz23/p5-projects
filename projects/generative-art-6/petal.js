class Petal {
  constructor(_props) {
    this.petalLength = _props.petalLength;
    this.ctrls = _props.ctrls;
    this.tipOffset = d3.randomUniform(
      -_props.offsetWindow,
      _props.offsetWindow
    )();
    this.rotation = _props.rotation;
    this.alpha = _props.alpha;
    this.center = { x: _props.center[0], y: _props.center[1] };
    this.fillInterpolator = _props.fillInterpolator;
  }

  drawPetal() {
    beginShape();
    vertex(0, 0);
    bezierVertex(
      -this.ctrls.ctrl1,
      this.petalLength / 3,
      -this.ctrls.ctrl2,
      (this.petalLength / 3) * 2,
      0 + this.tipOffset,
      this.petalLength
    );
    bezierVertex(
      this.ctrls.ctrl2 + this.tipOffset,
      (this.petalLength / 3) * 2,
      this.ctrls.ctrl1,
      this.petalLength / 3,
      0,
      0
    );
    endShape();
  }

  fillPetal() {
    push();
    noStroke();
    this.drawPetal();
    pop();
  }

  outlinePetal() {
    push();
    noFill();
    strokeWeight(2);
    stroke(0, 0, 10);
    this.drawPetal();
    pop();
  }

  render() {
    let data = Array.from({ length: 3000 }, () => ({
      x: d3.randomInt(0, Math.floor(width))(),
      y: d3.randomInt(0, Math.floor(height))(),
      t: random(0, 0.3),
    }));

    const voronoi = d3.Delaunay.from(
      data,
      (d) => d.x,
      (d) => d.y
    ).voronoi([0, 0, width, height]);

    push();
    beginClip();
    push();
    translate(this.center.x, this.center.y);
    rotate(this.rotation);
    this.fillPetal();
    pop();
    endClip();

    data.map((d, i) => {
      const bounds = voronoi.renderCell(i);
      const path = new Path2D(bounds);
      drawingContext.globalAlpha = this.alpha;
      drawingContext.strokeStyle = "white";
      drawingContext.lineWidth = 1;
      drawingContext.stroke(path);
      drawingContext.fillStyle = this.fillInterpolator(d.t);
      drawingContext.fill(path);
    });

    pop();

    push();
    translate(this.center.x, this.center.y);
    rotate(this.rotation);
    this.outlinePetal();
    pop();
  }
}
