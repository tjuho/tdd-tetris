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
  moveRight(){
    if (this.fallingShape){
      if (this.canMoveRight(this.fallingShape)){
        this.fallingShape.cx+=1;
      }
    }
  }
  moveLeft(){
    if (this.fallingShape){
      if (this.canMoveLeft(this.fallingShape)){
        this.fallingShape.cx-=1;
      }
    }
  }
  rotateRight(){
    if (this.fallingShape){
      if (this.canRotateRight(this.fallingShape)){
        this.fallingShape.rotateRight();
      }
    }
  }
  rotateLeft(){
    if (this.fallingShape){
      if (this.canRotateLeft(this.fallingShape)){
        this.fallingShape.rotateLeft();
      }
    }
  }

  tick() {
    if (this.fallingShape){
      if (this.canFall(this.fallingShape)){
        this.fallingShape.cy +=1;
      } else {
        this.shapes.push(this.fallingShape);
        this.fallingShape = undefined;
        this.handleFullRows();
      }
    }
  }

  handleFullRows(){
    let rowIds = this.fullRowIndexes();
    if (rowIds.length > 0){
      for (let j = 0; j < rowIds.length; j++){
        let y = rowIds[j];
        this.removeRow(y);
      }
      let foundfallingshape = true;
      while (foundfallingshape){
        foundfallingshape = false;
        this.shapes.forEach(this.fallShape);
      }
    }
  }

  fallShape(shape){
    console.log('shape', shape)
    while (this.canFall(shape)){
      foundfallingshape = true;
      shape.cy += 1;
    }

  }

  fullRowIndexes(){
    let fullrowindexes = []
    let str = this.toString();
    let rows = str.split('\n');
    for (let r = 0; r < this.height; r++){
      let row = rows[r];
      let isfull = true
      for (let char of row){
        if (char ==='.'){
          isfull = false;
          break;
        }
      }
      if (isfull){
        fullrowindexes.push(r);
      }
    }
    return fullrowindexes;
  }

  removeRow(idx){
    this.shapes.forEach(function(shape) {
      shape.removeRow(idx);
    });
  }

  canFall(shape){
    let positions = shape.getLowestBlockPositions();
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x,y+1)){
        return false;
      }
    }
    return true;
  }
  canMoveRight(shape){
    let positions = shape.getRightMostBlockPositions();
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x+1,y)){
        return false;
      }
    }
    return true;
  }
  canMoveLeft(shape){
    shape.rotate
    let positions = shape.getLeftMostBlockPositions();
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x-1,y)){
        return false;
      }
    }
    return true;
  }

  canRotateRight(shape){
    shape.rotateRight();
    let positions = shape.getBlockPositions();
    shape.rotateLeft();
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmptyWithoutFallingShape(x,y)){
        return false;
      }
    }
    return true;
  }
  
  canRotateLeft(shape){
    shape.rotateLeft();
    let positions = shape.getBlockPositions();
    shape.rotateRight();
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmptyWithoutFallingShape(x,y)){
        return false;
      }
    }
    return true;
  }


  _isEmpty(x,y,shapes){
    let isempty = true;
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false
    }
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

  isEmpty(x,y) {
    let shapes = this.shapes;
    shapes.push(this.fallingShape);
    return this._isEmpty(x,y,shapes);
  }

  isEmptyWithoutFallingShape(x,y) {
    return this._isEmpty(x,y,this.shapes);
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
}
