export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.row = ".".repeat(this.width);
    this.board = new Array(this.height).fill(this.row);
  }

  toString() {
    let board = "";
    for (const row of this.board) {
      board = board.concat(row, "\n");
    }
    return board;
  }
}
