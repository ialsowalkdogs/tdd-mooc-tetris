import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    let i = 0;
    while (i < 10) {
      board.moveLeft();
      i++;
    }

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    let i = 0;
    while (i < 10) {
      board.moveRight();
      i++;
    }

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    let i = 0;
    while (i < 10) {
      board.moveDown();
      i++;
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("cannot be moved left through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);

    let i = 0;
    while (i < 10) {
      board.moveLeft();
      board.moveDown();
      i++;
    }

    board.drop(Tetromino.T_SHAPE);

    i = 0;
    while (i < 10) {
      board.moveDown();
      i++;
    }

    console.log(board.toString());
  });

  xit("cannot be moved right through other blocks", () => {
    throw new Error("Test not implemented");
  });

  xit("cannot be moved down through other blocks (will stop falling)", () => {
    throw new Error("Test not implemented");
  });
});
