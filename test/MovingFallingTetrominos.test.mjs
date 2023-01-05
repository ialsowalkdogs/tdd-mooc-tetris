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

  xit("can be moved down", () => {
    throw new Error("Test not implemented");
  });

  xit("cannot be moved left beyond the board", () => {
    throw new Error("Test not implemented");
  });

  xit("cannot be moved right beyond the board", () => {
    throw new Error("Test not implemented");
  });

  xit("cannot be moved down beyond the board (will stop falling)", () => {
    throw new Error("Test not implemented");
  });

  xit("cannot be moved left through other blocks", () => {
    throw new Error("Test not implemented");
  });

  xit("cannot be moved right through other blocks", () => {
    throw new Error("Test not implemented");
  });

  xit("cannot be moved down through other blocks (will stop falling)", () => {
    throw new Error("Test not implemented");
  });
});
