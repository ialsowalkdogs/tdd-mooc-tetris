import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  constructor() {
    super();
  }

  static T_SHAPE = ".T.\nTTT\n...\n";
}
