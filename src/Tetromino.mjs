import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  constructor(shape) {
    super(shape);
  }

  static T_SHAPE = new RotatingShape(
    `.T.
    TTT
    ...`
  );
  static I_SHAPE = new RotatingShape(
    `.....
    .....
    IIII.
    .....
    .....`
  );
}
