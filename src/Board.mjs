import {
  range,
  getBlockRowIndices,
  replaceAt,
  createNewRow,
} from "./utils.mjs";

export class Board {
  width;
  height;
  board;
  fallingBlock;
  blockCoordinates;
  currentBlockRow;
  currentBlockHeight;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.row = ".".repeat(this.width);
    this.board = new Array(this.height).fill(this.row);

    this.fallingBlock = null;
    /** Coordinates of the top left corner of the falling block
     * Listed as [row, position]
     */
    this.blockCoordinates = null;
    /** Current row where the top of falling tetromino is */
    this.currentBlockRow = 0;
    /** How many rows are taken by a tetromino */
    this.currentBlockHeight = 0;
  }

  get blockHeight() {
    return this.fallingBlock.length;
  }

  toString() {
    return this.board.map((row) => row.concat("\n")).join("");
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.fallingBlock = block;
    const middleIndex = Math.floor(this.width / 2);

    const newBoard = [...this.board];
    if (typeof block === "string") {
      // Shape is 1x1
      // Set block coordinates as middle of first row
      this.blockCoordinates = [0, middleIndex];

      // Replace board points at those coordinates
      newBoard[this.blockCoordinates[0]] = createNewRow(
        newBoard[this.blockCoordinates[0]],
        this.blockCoordinates[1],
        block
      );
    } else if (block.shape) {
      // Shape is a Tetromino
      // Align middle of the tetromino with middle of the board
      const tetrominoMiddle = Math.floor(block.shape[0].length / 2);

      // Set block coordinates accordingly
      this.blockCoordinates = [0, middleIndex - tetrominoMiddle - 1];

      // Replace board points at those coordinates for every row
      for (let i = 0; i < block.shape.length; i++) {
        // For every row element, replace at those coordinates
        block.shape[i].forEach((el, j) => {
          newBoard[i] = createNewRow(
            newBoard[i],
            this.blockCoordinates[1] + j,
            el
          );
        });
      }
    } else throw new Error("Unknown Tetromino shape");

    this.currentBlockRow = 0;
    this.currentBlockHeight = block.length;
    this.board = newBoard;
  }

  tick() {
    /** Last row of Tetromino shape */
    const currentBlockRowEnd =
      this.currentBlockRow + this.currentBlockHeight - 1;

    if (this.board[currentBlockRowEnd + 1] === undefined) {
      this.fallingBlock = null;
    }

    if (!this.hasFalling()) return;

    const moveBlockDown = () => {
      const newBlockStart = this.currentBlockRow + 1;
      const newBlockEnd = currentBlockRowEnd + 1;
      const newBoard = [...this.board];

      // Update block coordinates
      const newCoordinates = [
        (this.blockCoordinates[0] += 1),
        this.blockCoordinates[1],
      ];
      // Shift tetromino one row down
      for (let i = 0; i < this.currentBlockHeight; i++) {
        if (typeof this.fallingBlock === "string") {
          newBoard[newCoordinates[0]] = createNewRow(
            newBoard[newCoordinates[0]],
            newCoordinates[1],
            this.fallingBlock
          );
        } else {
          // For every row element, replace at those coordinates
          this.fallingBlock.shape[i].forEach((el, j) => {
            newBoard[i] = createNewRow(newBoard[i], newCoordinates[1] + j, el);
          });
        }
      }
      // Clear previous row
      newBoard[this.currentBlockRow] = this.row;
      this.blockCoordinates = newCoordinates;

      this.board = newBoard;
      this.currentBlockRow += 1;
    };

    const hasOtherBlockBelow = () => {
      // If next row is empty, no need to calculate the rest
      if (this.board[currentBlockRowEnd + 1] === this.row) return false;

      // FIXME: this will get all non-row elements including other blocks
      const fallingLastRowIndices = getBlockRowIndices(
        this.board[currentBlockRowEnd]
      );
      const nextRowIndices = getBlockRowIndices(
        this.board[currentBlockRowEnd + 1]
      );

      if (
        nextRowIndices.some((index) => fallingLastRowIndices.includes(index))
      ) {
        return true;
      }
      return false;
    };

    if (hasOtherBlockBelow()) {
      this.fallingBlock = null;
    } else {
      moveBlockDown();
    }
  }

  moveRight() {
    const rowsToMove = this.board.slice(
      this.currentBlockRow,
      this.currentBlockRow + this.currentBlockHeight
    );

    const rowIsAtRightEdge = (row) => row[this.width - 1] !== ".";

    if (rowsToMove.some((row) => rowIsAtRightEdge(row))) return;

    const newRows = rowsToMove.map((row) =>
      ".".concat(row.slice(0, row.length - 1))
    );

    let startRows = this.board.slice(0, this.currentBlockRow);

    const newBoard = startRows
      // Add new rows
      .concat(newRows)
      // Add everything below
      .concat(
        this.board.slice(
          this.currentBlockRow + this.currentBlockHeight,
          this.board.length
        )
      );

    this.board = newBoard;
  }

  moveLeft() {
    const rowsToMove = this.board.slice(
      this.currentBlockRow,
      this.currentBlockRow + this.currentBlockHeight
    );

    const rowIsAtLeftEdge = (row) => row[0] !== ".";

    if (rowsToMove.some((row) => rowIsAtLeftEdge(row))) return;

    const newRows = rowsToMove.map((row) =>
      row.slice(1, row.length).concat(".")
    );

    let startRows = this.board.slice(0, this.currentBlockRow);

    const newBoard = startRows
      // Add new rows
      .concat(newRows)
      // Add everything below
      .concat(
        this.board.slice(
          this.currentBlockRow + this.currentBlockHeight,
          this.board.length
        )
      );

    this.board = newBoard;
  }

  moveDown() {
    this.tick();
  }
}
