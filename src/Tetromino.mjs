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

  static I_SHAPE_VERTICAL = new Tetromino(
    `..I..
    ..I..
    ..I..
    ..I..
    .....`
  );

  static O_SHAPE = new Tetromino(
    `.OO
    .OO
    ...`
  );

  rotateLeft() {
    switch (this.shape) {
      // I only has 2 distinct orientations so we hack around it a bit
      case Tetromino.I_SHAPE.shape:
        return Tetromino.I_SHAPE_VERTICAL;
      case Tetromino.I_SHAPE_VERTICAL.shape:
        return Tetromino.I_SHAPE;

      case Tetromino.O_SHAPE.shape:
        return Tetromino.O_SHAPE;
      default:
        return super.rotateLeft();
    }
  }

  rotateRight() {
    switch (this.shape) {
      // I only has 2 distinct orientations so we hack around it a bit
      case Tetromino.I_SHAPE.shape:
        return Tetromino.I_SHAPE_VERTICAL;
      case Tetromino.I_SHAPE_VERTICAL.shape:
        return Tetromino.I_SHAPE;

      case Tetromino.O_SHAPE.shape:
        return Tetromino.O_SHAPE;
      default:
        return super.rotateRight();
    }
  }
}
