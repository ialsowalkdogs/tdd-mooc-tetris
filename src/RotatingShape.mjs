export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.split("\n     ").map((row) => row.split(""));
  }

  toString() {
    return this.shape.map((row) => row.join("").concat("\n")).join("");
  }

  rotateRight() {
    const shapeRight = new RotatingShape(this.shape.toString());
    shapeRight.shape = this.shape.map((val, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
    return shapeRight;
  }

  rotateLeft() {
    const shapeLeft = new RotatingShape(this.shape.toString());
    let shapeReverse = this.shape.map((row) => row.reverse());
    shapeLeft.shape = shapeReverse.map((val, index) =>
      shapeReverse.map((row) => row[index])
    );
    return shapeLeft;
  }
}
