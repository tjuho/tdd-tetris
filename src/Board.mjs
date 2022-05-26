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
      this.matrix.push(Array(this.width).fill('.'));
    }
  }

  fillBoard() {
    let shapes = this.shapes;
    if (this.fallingShape){
      shapes.push(this.fallingShape);
    }
    this.fillBoardWithShapes(shapes);
  }

  fillBoardWithStaticTetrominos() {
    this.fillBoardWithShapes(this.shapes);
  }

  fillBoardWithShapes(shapes){
    for (let i=0; i<shapes.length; i++){
      let shape = shapes[i];
      let coordinates = this.calculateMatrixCoordinates(shape.matrix, shape.cx, shape.cy);
      for (let j=0; j<coordinates.length; j++){
        let [x,y] = coordinates[j];
        this.matrix[y][x] = shape['color'];
      }
    }
  }

  hasFalling1() {
    for (let r=this.height-1; r>-1; r--){
      for (let c=0; c<this.width; c++){
        if ((this.matrix[r][c]).isFalling) {
            return true;
        }
      }
    }
    return false;
  }

  hasFalling() {
    if (this.fallingShape) {
      return true;
    } else { return false; }
  }


  drop1(block) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    let middle = parseInt(this.width/2);
    this.matrix[0][middle] = block;
  }

  drop(tetromino) {
    let some = tetromino.matrix[0];
    if (this.hasFalling()) {
      throw "already falling";
    }
    let topleftcornerx = parseInt((this.width - (tetromino.matrix[0]).length)/2);
    this.fallingShape = {'cx': topleftcornerx, 'cy': 0, 'matrix': tetromino['matrix'], 'color': tetromino['color']};
  }

  tick() {
    this.clearBoard();
    this.fillBoard();
    if (this.canFall(this.fallingShape)){
      this.fallingShape['y'] +=1;
    } else {
      this.shapes.push(this.fallingShape);
      this.fallingShape = null;
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

  canFall(shape){
    let coordinatesList = this.calculateMatrixCoordinates(shape.matrix, shape.cx, shape.cy);
    for (let i=0; i<coordinatesList.length; i++){
      let x = coordinatesList[i][0];
      let y = coordinatesList[i][1];
      if (!this.isEmpty(x,y+1)){
        return false;
      }
    }
    return true;
  }

  isEmpty(x,y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false
    }
    return this.matrix[y][x].color === '.';
  }

  calculateMatrixCoordinates(mat, cx, cy){
    let coordinates = [];
    for (let r=0; r<mat.length; r++){
      for (let c=0; c<mat.length; c++){
        if (mat[r][c] === 1){
          coordinates.push([cx+c, cy+r]);
        }
      }
    }
    return coordinates;
  }

  toString() {
    this.clearBoard();
    this.fillBoard();
    let result = '';
    for (let r=0; r<this.height; r++){
      for (let c=0; c<this.width; c++){
        result += this.matrix[r][c];
      }
      result += '\n';
    }
    return result;
  }
}
