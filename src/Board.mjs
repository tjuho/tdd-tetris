import { Block } from "./Block.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

export class Board {
  width;
  height;
  matrix;
  shapes;
  fallingShape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shapes = [];
    this.clearBoard();
  }

  clearBoard() {
    this.matrix = [];
    for (let r=0; r<this.height; r++){
      this.matrix.push(Array(this.width).fill(new Block('.')));
    }
  }

  hasFalling() {
    for (let r=this.height-1; r>-1; r--){
      for (let c=0; c<this.width; c++){
        if ((this.matrix[r][c]).isFalling) {
            return true;
        }
      }
    }
    return false;
  }

  isEmpty(c,r) {
    if (c < 0 || c >= this.width || r < 0 || r >= this.height) {
      return false
    }
    return this.matrix[r][c].color === '.';
  }

  drop(block) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    let middle = parseInt(this.width/2);
    this.matrix[0][middle] = block;
  }

  drop(tetromino) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    topleftcornerx = parseInt((this.width - (tetromino['matrix'][0]).length)/2);
    fallingShape = {'cx': topleftcornerx, 'cy': 0, 'matrix': tetromino['matrix'], 'color': tetromino['color']};
  }

  tick() {
    for (let i=0; i<this.shapes.length; i++){
      let shape = this.shapes[i];
      let coordinates = this.calculateShapeCoordinates(shape['matrix']);
      for (let j=0; j<coordinates.length; j++){
        [x,y] = coordinates[j];
        this.matrix[y][x] = shape['color'];
      }
    }
  }
  tick1(){
    for (let r=this.height-1; r>-1; r--){
      for (let c=0; c<this.width; c++){
        let block = this.matrix[r][c];
        if (block.isFalling){
          if (!this.isEmpty(c,r) && this.isEmpty(c,r+1)) {
            let temp = this.matrix[r+1][c]
            this.matrix[r+1][c] = block;
            this.matrix[r][c] = temp;
          } else {
            block.isFalling = false;
          }
        }
      }
    }
  }

  calculateShapeCoordinates(shape){
    let coordinates = [];
    let cx = shape['cx'];
    let cy = shape['cy'];
    let mat = shape['matrix'];
    for (let r=0; r<mat.length; r++){
      for (let c=0; c<mat.length; c++){
        if (mat[r][c] === 1){
          coordinates.push([cx+c, cy+r]);
        }
      }
    }
    return coordinates;
  }

  getShapeStartCoordinates(shape) {
    x = parseInt(this.width/2)
    if (shape === this.T_SHAPE){
      return [(x,1),(x,0), (x-1,1), (x+1,1)];
    }
  }

  toString() {
    let result = '';
    for (let r=0; r<this.height; r++){
      for (let c=0; c<this.width; c++){
        result += (this.matrix[r][c]).color;
      }
      result += '\n';
    }
    return result;
  }
}
