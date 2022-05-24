import { Block } from "./Block.mjs";

export class Board {
  width;
  height;
  matrix;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.clearBoard();
  }

  clearBoard() {
    this.matrix = [];
    for (let r=0; r<this.height; r++){
      this.matrix.push(Array(this.width).fill(new Block('.')));
    }
  }

  drop(block) {
    let middle = parseInt(this.width/2);
    this.matrix[0][middle] = block;
  }

  toString() {
    let result = ''
    for (let r=0; r<this.height; r++){
      for (let c=0; c<this.width; c++){
        result += (this.matrix[r][c]).color;
      }
      result += '\n'
    }
    return result;
  }
}
