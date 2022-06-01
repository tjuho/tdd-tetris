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
    this.fallingShape = undefined;
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
    this.fallingShape = Object.create(tetromino);
    this.fallingShape['size'] = this.fallingShape.rotations[0].length;
    this.fallingShape.cornerx = parseInt((this.width - this.fallingShape.size)/2);
    this.fallingShape.cornery = 0;
    let positions = this.getBlockPositions(this.fallingShape);
    let isgameover = false;
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x,y)){
        isgameover = true;
        break;
      }
    }
    if (isgameover){
      this.gameOver();
    }
  }

  gameOver(){
    console.log('game over');
  }
  moveRight(){
    if (this.fallingShape){
      if (this.canMoveRight(this.fallingShape)){
        this.fallingShape.cornerx+=1;
      }
    }
  }
  moveLeft(){
    if (this.fallingShape){
      if (this.canMoveLeft(this.fallingShape)){
        this.fallingShape.cornerx-=1;
      }
    }
  }
  rotateRight(){
    if (this.fallingShape){
      if (this.canRotateRight(this.fallingShape)){
        this._rotateRight(this.fallingShape);
      }
    }
  }
  rotateLeft(){
    if (this.fallingShape){
      if (this.canRotateLeft(this.fallingShape)){
        this._rotateLeft(this.fallingShape);
      }
    }
  }

  tick() {
    /*console.log('shapes tick', this.shapes)*/
    if (this.fallingShape){
      if (this.canFall(this.fallingShape)){
          this.fallingShape.cornery +=1;
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
        for (let i = 0; i < this.shapes.length; i++){
          let shape = this.shapes[i];
          if (this.canFall(shape)){
            foundfallingshape = true;
            shape.cornery += 1;
          }
        }
        foundfallingshape = false;
      }
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

  removeRow(rowIndex){
    console.log('removerow', rowIndex);
    for (let i = 0; i < this.shapes.length; i++){
      let shape = this.shapes[i];
      if (rowIndex >= shape.cornery && rowIndex < shape.cornery + shape.size){
        let shapeRowIndex = rowIndex - shape.cornery;
        let mat = shape.rotations[shape.orientation];
        mat[shapeRowIndex] = Array(shape.size).fill(0);
      }
    }
  }

  canFall(shape){
    let positions = this.getLowestBlockPositions(shape);
    /*console.log('can fall lowest posä', positions)*/
    /*console.log(this.toString())*/
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
    let positions = this.getRightMostBlockPositions(shape);
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
    let positions = this.getLeftMostBlockPositions(shape);
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
    this._rotateRight(shape);
    let positions = this.getBlockPositions(shape);
    this._rotateLeft(shape);
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x,y)){
        return false;
      }
    }
    return true;
  }
  
  canRotateLeft(shape){
    this._rotateLeft(shape);
    let positions = this.getBlockPositions(shape);
    this._rotateRight(shape);
    for (let i = 0; i < positions.length; i++){
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x,y)){
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

    /*console.log('target x',x);
    console.log('target y',y);*/
    for (let i = 0; i < shapes.length; i++){
      let shape = shapes[i];
      let positions = this.getBlockPositions(shape);
      for (let j = 0; j < positions.length; j++){
        let pos = positions[j];
        /*console.log('test', pos)*/
        let tx = parseInt(pos[0]);
        let ty = parseInt(pos[1]);
        if (x === tx && y === ty){
          isempty = false;
          break;
        }
      }
    }
    return isempty;
  }

  isEmpty(x,y) {
    return this._isEmpty(x,y,this.shapes);
  }


  getRightMostBlockPositions(shape){
    let result = []
    let mat = shape.rotations[shape.orientation];
    for (let r = 0; r < shape.size; r++){
        let rightmostx = -1;
        for (let c = 0; c < shape.size; c++){
            if (mat[r][c] > 0){
                rightmostx = c;
            }
        }
        if (rightmostx > -1){
            result.push([shape.cornerx+rightmostx, shape.cornery+r]);
        }
    }
    return result;
  }

  getLeftMostBlockPositions(shape){
      let result = []
      let mat = shape.rotations[shape.orientation];
      for (let r = 0; r < shape.size; r++){
          let leftmostx = -1;
          for (let c = shape.size - 1; c >= 0; c--){
              if (mat[r][c] > 0){
                  leftmostx = c;
              }
          }
          if (leftmostx > -1){
              result.push([shape.cornerx+leftmostx, shape.cornery+r]);
          }
      }
      return result;
  }

  getLowestBlockPositions(shape){
    let result = []
    let mat = shape.rotations[shape.orientation];
    for (let c = 0; c < shape.size; c++){
        let lowesty = -1;
        for (let r = 0; r < shape.size; r++){
            if (mat[r][c] > 0){
                lowesty = r;
            }
        }
        if (lowesty > -1){
            result.push([shape.cornerx+c, shape.cornery+lowesty]);
        }
    }
    return result;
  }   

  getBlockPositions(shape){
      let positions = [];
      let matrix = shape.rotations[shape.orientation];
      for (let r = 0; r < shape.size; r++){
          for (let c = 0; c < shape.size; c++){
              if (matrix[r][c] > 0){
                  positions.push([shape.cornerx+c,shape.cornery+r]);
              }
          }
      }
      return positions;
  }

  _rotateRight(shape){
      if (shape.orientation === shape.rotations.length - 1){
          shape.orientation = 0;
      } else {
          shape.orientation += 1;
      }
  }    

  _rotateLeft(shape){
      if (shape.orientation === 0){
          shape.orientation = shape.rotations.length - 1;
      } else {
          shape.orientation -= 1;
      }
  }    

  getAllShapes(){
    let shapes = [];
    for (let i=0; i < this.shapes.length; i++){
      shapes.push(this.shapes[i]);
    }
    if (this.fallingShape){
      shapes.push(this.fallingShape);
    }
    return shapes;
  }

  toString() {
    let str = '';
    for (let r=0; r<this.height; r++){
      for (let c=0; c<this.width; c++){
        str += '.';
      }
      str += '\n';
    }
    let shapes = this.getAllShapes();
    /*console.log('shapes to string', shapes)*/
    let width = this.width;
    for (let i = 0; i < shapes.length; i++){
      let shape = shapes[i];
      let positions = this.getBlockPositions(shape);
      for (let i = 0; i < positions.length; i++){
        let pos = positions[i];
        let x = parseInt(pos[0]);
        let y = parseInt(pos[1]);
        let j = x + y * (width+1);
        str = str.substring(0, j) + shape.color + str.substring(j + 1);
      }
    }
    return str;
  }
}
