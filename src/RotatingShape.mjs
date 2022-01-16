export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.split("\n     ");
  }

  toString() {
    let shapeStr = "";
    for (const row of this.shape) {
      shapeStr = shapeStr.concat(row, "\n");
    }
    return shapeStr;
  }

  rotateRight() {
    throw new Error("Not implemented");
  }

  rotateLeft() {
    throw new Error("Not implemented");
  }
}
