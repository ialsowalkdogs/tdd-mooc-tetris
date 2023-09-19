import { range, getBlockRowIndices, deepClone } from "./utils.mjs";

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

    this.row = new Array(this.width).fill(".");
    this.board = new Array(this.height).fill([...this.row]);

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
    return this.fallingBlock.shape.length;
  }

  get blockBoundaries() {
    const rowRange = range(this.blockHeight, this.blockCoordinates[0]);
    const columnRange = range(
      this.fallingBlock.shape[0].length,
      this.blockCoordinates[1]
    );
    return rowRange.reduce((acc, el) => {
      return { ...acc, [el]: [...columnRange] };
    }, {});
  }

  toString() {
    return this.board.map((row) => row.join("").concat("\n")).join("");
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.fallingBlock = block.shape ?? block;
    const middleIndex = Math.floor(this.width / 2);

    const newBoard = deepClone(this.board);
    if (typeof block === "string") {
      // Shape is 1x1
      // Set block coordinates as middle of first row
      this.blockCoordinates = [0, middleIndex];
      const [row, column] = this.blockCoordinates;

      // Replace board points at those coordinates
      newBoard[row][column] = block;
    } else {
      // Shape is a Tetromino
      // Align middle of the tetromino with middle of the board
      const tetrominoMiddle = Math.floor(block.shape[0].length / 2);

      // Set block coordinates accordingly
      this.blockCoordinates = [0, middleIndex - tetrominoMiddle - 1];
      const [row, column] = this.blockCoordinates;

      // Replace board points at those coordinates for every row
      for (let i = 0; i < block.shape.length; i++) {
        // For every row element, replace at those coordinates
        block.shape[i].forEach((el, j) => {
          newBoard[i][column + j] = el;
        });
      }
    }

    this.currentBlockRow = 0;
    this.currentBlockHeight = block.shape ? block.shape.length : block.length;
    this.board = newBoard;
  }

  tick() {
    if (
      this.board[this.currentBlockRow + this.currentBlockHeight] === undefined
    ) {
      this.fallingBlock = null;
    }

    if (!this.hasFalling()) return;

    /** Last row of Tetromino shape */
    const currentBlockRowEnd =
      this.currentBlockRow + this.currentBlockHeight - 1;

    const moveBlockDown = () => {
      const newBoard = deepClone(this.board);

      // Update block coordinates
      const [newRow, newColumn] = [
        (this.blockCoordinates[0] += 1),
        this.blockCoordinates[1],
      ];
      // Shift tetromino one row down
      for (let i = 0; i < this.currentBlockHeight; i++) {
        if (this.fallingBlock.shape) {
          // For every row element, replace at those coordinates
          this.fallingBlock.shape[i].forEach((el, j) => {
            newBoard[i][newColumn + j] = el;
          });
        } else {
          newBoard[newRow][newColumn] = this.fallingBlock;
        }
      }
      // Clear previous row
      newBoard[this.currentBlockRow] = this.row;
      this.blockCoordinates = [newRow, newColumn];

      this.board = newBoard;
      this.currentBlockRow += 1;
    };

    const hasOtherBlockBelow = () => {
      // If next row is empty, no need to calculate the rest
      if (this.board[currentBlockRowEnd + 1] === this.row) return false;

      //

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
