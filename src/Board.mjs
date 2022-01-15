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

  drop(block) {
    const middleIndex = Math.floor(this.width / 2);
    const newFirstRow = this.board[0]
      .slice(0, middleIndex)
      .concat("X", this.board[0].slice(middleIndex + 1, this.width));
    this.board[0] = newFirstRow;
  }
}
