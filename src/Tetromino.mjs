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

  rotateLeft() {
    if (this.shape === Tetromino.I_SHAPE.shape) return super.rotateRight();
    else return super.rotateLeft();
  }
}
