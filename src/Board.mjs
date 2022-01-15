export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const board = ".".repeat(this.width).concat("\n").repeat(this.height);
    return board;
  }
}
