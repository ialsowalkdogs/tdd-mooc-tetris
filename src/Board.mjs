export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.middleIndex = Math.floor(this.width / 2);

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
    const newFirstRow = this.row
      .slice(0, this.middleIndex)
      .concat("X", this.row.slice(this.middleIndex + 1, this.width));
    this.board[0] = newFirstRow;
  }

  tick() {
    this.board[0] = this.row;
    this.board[1] = this.row
      .slice(0, this.middleIndex)
      .concat("X", this.row.slice(this.middleIndex + 1, this.width));
  }
}
