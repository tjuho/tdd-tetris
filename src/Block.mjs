export class Block {
  color;
  isFalling=true;

  constructor(color) {
    this.color = color;
  }

  isEmpty() {
    return this.color === '.'
  }
  notEmpty() {
    return this.color !== '.'
  }
}
