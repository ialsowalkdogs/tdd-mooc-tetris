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
    switch (this.shape) {
      case Tetromino.I_SHAPE.shape:
        return super.rotateRight();
      case Tetromino.O_SHAPE.shape:
        return Tetromino.O_SHAPE;
      default:
        return super.rotateLeft();
    }
  }

  rotateRight() {
    switch (this.shape) {
      case Tetromino.O_SHAPE.shape:
        return Tetromino.O_SHAPE;
      default:
        return super.rotateRight();
    }
  }
}
