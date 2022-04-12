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
    return this.board.map((row) => row.concat("\n")).join("");
  }

  hasFalling() {
    return this.hasFallingBlocks;
  }

  drop(block) {
    if (this.hasFallingBlocks) {
      throw new Error("already falling");
    }

    this.hasFallingBlocks = true;

    if (block.color) {
      // Shape is 1x1
      const fallingRow = this.row
        .slice(0, this.middleIndex)
        .concat(block.color, this.row.slice(this.middleIndex + 1, this.width));
      this.board[0] = fallingRow;
      this.currentBlockRow = 0;
    } else if (block.shape) {
      // Shape is a Tetromino
      const padBlockRow = (blockRow) => {
        const paddedRow = this.row
          .slice(0, Math.ceil(blockRow.length / 2) + 1)
          .concat(
            blockRow.join(""),
            this.row.slice(
              this.middleIndex + Math.floor(blockRow.length / 2),
              this.width
            )
          );

        if (paddedRow.length > this.row.length) {
          throw new Error(
            `Too much padding for Tetromino: expected ${this.row.length}, got ${paddedRow.length}`
          );
        } else if (paddedRow.length < this.row.length) {
          throw new Error(
            `Too little padding for Tetromino: expected ${this.row.length}, got ${paddedRow.length}`
          );
        }
        return paddedRow;
      };
      // Pad tetromino rows to shape
      const blockSplit = block.shape.map((blockRow) => padBlockRow(blockRow));

      // Replace first Tetromino.height = no of rows with paddeds̄
      const blockHeight = blockSplit.length;
      this.board = blockSplit.concat(this.board.slice(blockHeight));
      this.currentBlockRow = 0;
    }
  }

  tick() {
    if (
      this.currentBlockRow == this.height - 1 ||
      this.board[this.currentBlockRow + 1] !== "..."
    ) {
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
