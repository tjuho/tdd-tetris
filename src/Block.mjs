export class Block {
  color;
  isFalling;

  constructor(color) {
    this.color = color;
    this.isFalling = color !== '.';
  }

  isEmpty() {
    return this.color === '.';
  }
  notEmpty() {
    return this.color !== '.';
  }
}
