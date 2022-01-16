export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.middleIndex = Math.floor(this.width / 2);

    this.row = ".".repeat(this.width);
    this.board = new Array(this.height).fill(this.row);

    this.hasFallingBlocks = false;
    this.currentBlockRow = 0;
  }

  toString() {
    let board = "";
    for (const row of this.board) {
      board = board.concat(row, "\n");
    }
    return board;
  }

  hasFalling() {
    return this.hasFallingBlocks;
  }

  drop(block) {
    if (this.hasFallingBlocks) {
      throw new Error("already falling");
    }

    this.hasFallingBlocks = true;

    const fallingRow = this.row
      .slice(0, this.middleIndex)
      .concat(block.color, this.row.slice(this.middleIndex + 1, this.width));
    this.board[0] = fallingRow;
    this.currentBlockRow = 0;
  }

  tick() {
    if (this.currentBlockRow == this.height - 1) {
      this.hasFallingBlocks = false;
    }

    if (this.hasFallingBlocks) {
      this.board[this.currentBlockRow + 1] = this.board[this.currentBlockRow];
      if (this.currentBlockRow == 0) {
        this.board[this.currentBlockRow] = this.row;
      } else {
        this.board[this.currentBlockRow] = this.board[this.currentBlockRow - 1];
      }

      this.currentBlockRow += 1;
    }
  }
}
