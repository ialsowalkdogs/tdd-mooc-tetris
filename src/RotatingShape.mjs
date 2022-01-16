export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.split("\n     ").map((row) => row.split(""));
  }

  toString() {
    return this.shape.map((row) => row.join("").concat("\n")).join("");
  }

  rotateRight() {
    return this.shape.map((val, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
  }

  rotateLeft() {
    throw new Error("Not implemented");
  }
}
