import { Tetromino } from "../src/Tetromino.mjs";
import { SingleShape, IShape, TShape, Shape } from "./Shape.mjs";
import { ShapeBuilder } from "./ShapeBuilder.mjs";
export class Board {
  width;
  height;
  gameField;
  shapes;
  fallingShape;
  shapeBuilder;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shapes = [];
    this.gameField = [];
    this.shapeBuilder = new ShapeBuilder(width);
  }

  hasFalling() {
    if (this.fallingShape) {
      return true;
    } else { return false; }
  }

  drop(tetromino) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    this.fallingShape = this.shapeBuilder.createShape(tetromino, 'X');
  }

  tick() {
    if (this.canFall(this.fallingShape)){
      this.fallingShape.cy +=1;
    } else {
      this.shapes.push(this.fallingShape);
      this.fallingShape = undefined;
    }
  }
  canFall(shape){
    let lowests = shape.getLowestBlocks();
    for (let low in lowests){
      let x = low[0]
      let y = low[1]
      if (!this.isEmpty(x,y+1)){
        return false
      }
    }
    return true;
  }

  isEmpty(x,y) {
    let isempty = true;
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false
    }
    let shapes = this.shapes;
    shapes.push(this.fallingShape);
    shapes.forEach(function(shape) {
      let positions = shape.getBlockPositions();
      for (let i = 0; i < positions.length; i++){
        let pos = positions[i];
        let tx = parseInt(pos[0]);
        let ty = parseInt(pos[1]);
        if (x === tx && y === ty){
          isempty = false;
          break;
        }
      }
    });
    return isempty;
  }

  toString() {
    let str = '';
    for (let r=0; r<this.height; r++){
      for (let c=0; c<this.width; c++){
        str += '.';
      }
      str += '\n';
    }
    let shapes = this.shapes;
    if (this.fallingShape){
      shapes.push(this.fallingShape);
    }
    let width = this.width;
    shapes.forEach(function(shape) {
      let positions = shape.getBlockPositions();
      for (let i = 0; i < positions.length; i++){
        let pos = positions[i];
        let x = parseInt(pos[0]);
        let y = parseInt(pos[1]);
        let j = x + y * (width+1);
        str = str.substring(0, j) + shape.color + str.substring(j + 1);
      }
    });
    return str;
  }

/*
  clearBoard() {
    this.gameField = [];
    for (let r=0; r<this.height; r++){
      for (let c=0; c<this.width; c++){
        this.gameField += '.'
      }
      this.gameField += '\n'
    }
  }

  fillBoard() {
    let shapes = this.shapes;
    if (this.fallingShape){
      shapes.push(this.fallingShape);
    }
    this.fillBoardWithShapes(shapes);
  }

  fillBoardWithShapes1(shapes){
    for (let i=0; i<shapes.length; i++){
      let shape = shapes[i];
      let coordinates = this.calculateMatrixCoordinates(shape.matrix, shape.cx, shape.cy);
      for (let j=0; j<coordinates.length; j++){
        let [x,y] = coordinates[j];
        this.gameField[y][x] = shape.color;
      }
    }
  }

  fillBoardWithShapes(shapes){
    for (let i = 0; i < shapes.length; i++){
      let shape = shapes[i];
      let positions = shape.getBlockPositions();
      for (let pos in positions){
        let x = pos[0];
        let y = pos[1];
        this.gameField[y][x] = shape.color;
      }
    }
  }

  hasFalling1() {
    for (let r=this.height-1; r>-1; r--){
      for (let c=0; c<this.width; c++){
        if ((this.gameField[r][c]).isFalling) {
            return true;
        }
      }
    }
    return false;
  }

  drop1(block) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    let middle = parseInt(this.width/2);
    this.gameField[0][middle] = block;
  }

  drop2(tetromino) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    let topleftcornerx = parseInt((this.width - (tetromino.matrix[0]).length)/2);
    this.fallingShape = {'cx': topleftcornerx, 'cy': 0, 'matrix': tetromino['matrix'], 'color': tetromino['color']};
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
  tick1(){
    for (let r=this.height-1; r>-1; r--){
      for (let c=0; c<this.width; c++){
        let block = this.gameField[r][c];
        if (block.isFalling){
          if (!this.isEmpty(c,r) && this.isEmpty(c,r+1)) {
            let temp = this.gameField[r+1][c]
            this.gameField[r+1][c] = block;
            this.gameField[r][c] = temp;
          } else {
            block.isFalling = false;
          }
        }
      }
    }
  }


*/
}
