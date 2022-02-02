import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  constructor(shape) {
    super(shape);
  }

  static T_SHAPE = new Tetromino(
    `.T.
    TTT
    ...`
  );

  static I_SHAPE = new Tetromino(
    `.....
    .....
    IIII.
    .....
    .....`
  );

  static O_SHAPE = new Tetromino(
    `.OO
    .OO
    ...`
  );

  rotateLeft() {
    switch (true) {
      // If it has Is it's an I shape
      // Ugliest shit ever... but works
      case this.shape.some((row) => row.some((el) => el === "I")):
        return new Tetromino(
          `..I..
          ..I..
          ..I..
          ..I..
          .....`
        );
      case this.shape === Tetromino.O_SHAPE.shape:
        return Tetromino.O_SHAPE;
      default:
        return super.rotateLeft();
    }
  }

  rotateRight() {
    switch (true) {
      case this.shape.some((row) => row.some((el) => el === "I")):
        return new Tetromino(
          `..I..
          ..I..
          ..I..
          ..I..
          .....`
        );
      case this.shape === Tetromino.O_SHAPE.shape:
        return Tetromino.O_SHAPE;
      default:
        return super.rotateRight();
    }
  }
}
