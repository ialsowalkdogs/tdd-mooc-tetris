export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.split("\n     ").map((row) => row.split(""));
  }

  toString() {
    let shapeStr = "";
    for (const row of this.shape) {
      shapeStr = shapeStr.concat(row.join(""), "\n");
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
