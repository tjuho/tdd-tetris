import { Score } from "./Score.mjs";
import { Randomizer } from "./Randomizer.mjs";
import { Tetromino } from "./Tetromino.mjs";
export class Board {
  width;
  height;
  gameField;
  shapes;
  fallingShape;
  score;
  level;
  observers;


  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shapes = [];
    this.gameField = [];
    for (let r = 0; r < height; r++) {
      this.gameField.push(Array(width))
    }
    this.fallingShape = undefined;
    this.score = new Score();
    this.observers = {};
    this.tetrominoRandomizer = new Randomizer();
    this.tetrominoRandomizer.add(Tetromino.I_SHAPE, 12);
    this.tetrominoRandomizer.add(Tetromino.T_SHAPE, 18);
    this.tetrominoRandomizer.add(Tetromino.O_SHAPE, 15);
    this.tetrominoRandomizer.add(Tetromino.LR_SHAPE, 18);
    this.tetrominoRandomizer.add(Tetromino.LL_SHAPE, 18);
    this.tetrominoRandomizer.add(Tetromino.SL_SHAPE, 15);
    this.tetrominoRandomizer.add(Tetromino.SR_SHAPE, 15);
  }

  hasFalling() {
    if (this.fallingShape) {
      return true;
    } else { return false; }
  }

  dropRandom() {
    this.drop(this.tetrominoRandomizer.next());
  }

  drop(tetromino) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    this.fallingShape = Object.create(tetromino);
    this.fallingShape['size'] = this.fallingShape.rotations[0].length;
    this.fallingShape.cornerx = parseInt((this.width - this.fallingShape.size) / 2);
    /*this.signalFallingShapeMoved();*/
    let positions = this.getBlockPositions(this.fallingShape);
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x, y)) {
        this.gameOver();
        break;
      }
    }
  }

  gameOver() {
    console.log('game over');
    this.fallingShape = undefined;
    this.shapes = [];
    this.score.reset();
  }

  moveRight() {
    if (this.fallingShape) {
      if (this.canMoveRight(this.fallingShape)) {
        this.fallingShape.cornerx += 1;
        /*this.signalFallingShapeMoved();*/
      }
    }
  }
  moveLeft() {
    if (this.fallingShape) {
      if (this.canMoveLeft(this.fallingShape)) {
        this.fallingShape.cornerx -= 1;
        /*this.signalFallingShapeMoved();*/
      }
    }
  }
  moveDown() {
    if (this.fallingShape && this.canFall(this.fallingShape)) {
      this.tick();
    }
  }
  moveToBottom() {
    while (this.fallingShape) {
      this.tick();
    }
  }
  rotateRight() {
    if (this.fallingShape) {
      if (this.canRotateRight(this.fallingShape)) {
        this._rotateRight(this.fallingShape);
        /*this.signalFallingShapeMoved();*/
        return;
      }
      let topleftcorner = this.fallingShape.cornerx;
      if (topleftcorner < 0) {
        for (let i = 0; i < -topleftcorner; i++) {
          this.moveRight();
        }
        if (this.canRotateRight(this.fallingShape)) {
          this._rotateRight(this.fallingShape);
          /*this.signalFallingShapeMoved();*/
          return;
        }
      }
      let toprightcorner = this.fallingShape.cornerx + this.fallingShape.size;
      if (toprightcorner > this.width) {
        for (let i = 0; i < toprightcorner - this.width; i++) {
          this.moveLeft();
        }
        if (this.canRotateRight(this.fallingShape)) {
          this._rotateRight(this.fallingShape);
          /*this.signalFallingShapeMoved();*/
          return;
        }
      }
      let topleftcornery = this.fallingShape.cornery;
      if (topleftcornery < 0) {
        this._rotateRight(this.fallingShape);
        for (let i = 0; i < -topleftcornery; i++) {
          this.fallingShape.cornery += 1;
        }
        if (this.areEmptyPositions(this.getBlockPositions(this.fallingShape))) {
          /*this.signalFallingShapeMoved();*/
          return
        }
        this._rotateLeft(this.fallingShape);
        this.fallingShape.cornery = topleftcornery
      }
      this.fallingShape.cornerx = topleftcorner;
    }
  }
  rotateLeft() {
    if (this.fallingShape) {
      if (this.canRotateLeft(this.fallingShape)) {
        this._rotateLeft(this.fallingShape);
        /*this.signalFallingShapeMoved();*/
        return;
      }
      let topleftcorner = this.fallingShape.cornerx;
      if (topleftcorner < 0) {
        for (let i = 0; i < -topleftcorner; i++) {
          this.moveRight();
        }
        if (this.canRotateLeft(this.fallingShape)) {
          this._rotateLeft(this.fallingShape);
          /*this.signalFallingShapeMoved();*/
          return;
        }
      }
      let toprightcorner = this.fallingShape.cornerx + this.fallingShape.size;
      if (toprightcorner > this.width) {
        for (let i = 0; i < toprightcorner - this.width; i++) {
          this.moveLeft();
        }
        if (this.canRotateLeft(this.fallingShape)) {
          this._rotateLeft(this.fallingShape);
          /*this.signalFallingShapeMoved();*/
          return;
        }
      }
      let topleftcornery = this.fallingShape.cornery;
      if (topleftcornery < 0) {
        this._rotateLeft(this.fallingShape);
        for (let i = 0; i < -topleftcornery; i++) {
          this.fallingShape.cornery += 1;
        }
        if (this.areEmptyPositions(this.getBlockPositions(this.fallingShape))) {
          /*this.signalFallingShapeMoved();*/
          return
        }
        this._rotateRight(this.fallingShape);
        this.fallingShape.cornery = topleftcornery
      }
      this.fallingShape.cornerx = topleftcorner;
    }
  }

  tick() {
    if (this.fallingShape) {
      if (this.canFall(Object.create(this.fallingShape))) {
        this.fallingShape.cornery += 1;
        /*this.signalFallingShapeMoved();*/
      } else {
        this.shapes.push(this.fallingShape);
        const positions = this.getBlockPositions(this.fallingShape);
        for (let p = 0; p < positions.length; p++) {
          const pos = positions[p];
          this.gameField[pos[1]][pos[0]] = this.fallingShape.color;
        }
        /*this.signalStaticShapesChanged();*/
        this.fallingShape = undefined;
        /*this.clearingRows();*/
        this.clearFullRows();
      }
    }
  }

  clearFullRows() {
    let rowNumbers = [];
    for (let r = 0; r < this.height; r++) {
      if (!this.gameField[r].includes(undefined)) {
        rowNumbers.push(r);
      }
    }
    for (let n = rowNumbers.length - 1; 0 <= n; n--) {
      let row = rowNumbers[n];
      this.gameField.splice(row, 1);
    }
    this.score.rowsCleared(this.height - this.gameField.length);
    while (this.gameField.length < this.height) {
      this.gameField.unshift(Array(this.width));
    }
  }

  clearingRows() {
    let rowIds = this.fullRowIndexes();
    if (rowIds.length > 0) {
      this.score.rowsCleared(rowIds.length, this.level);
      /*this.signalLinesRemoved(rowIds.length);*/
      for (let j = 0; j < rowIds.length; j++) {
        let y = rowIds[j];
        this.removeRow(y);
      }
      let foundfallingshape = true;
      while (foundfallingshape) {
        for (let i = 0; i < this.shapes.length; i++) {
          let shape = this.shapes[i];
          if (this.canFall(shape)) {
            foundfallingshape = true;
            shape.cornery += 1;
          }
        }
        foundfallingshape = false;
      }
    }
  }

  fullRowIndexes() {
    let fullrowindexes = []
    let str = this.toString();
    let rows = str.split('\n');
    for (let r = 0; r < this.height; r++) {
      let row = rows[r];
      let isfull = true
      for (let char of row) {
        if (char === '.') {
          isfull = false;
          break;
        }
      }
      if (isfull) {
        fullrowindexes.push(r);
      }
    }
    return fullrowindexes;
  }

  removeRow(rowIndex) {
    for (let i = 0; i < this.shapes.length; i++) {
      let shape = this.shapes[i];
      if (rowIndex >= shape.cornery && rowIndex < shape.cornery + shape.size) {
        let shapeRowIndex = rowIndex - shape.cornery;
        let mat = shape.rotations[shape.orientation];
        mat[shapeRowIndex] = Array(shape.size).fill(0);
      }
    }
  }

  _moveDown(shape) {
    if (this.canFall(shape)) {
      shape.cornery += 1
    }
  }

  canFall(shape) {
    let positions = this.getLowestBlockPositions(shape);
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x, y + 1)) {
        return false;
      }
    }
    return true;
  }
  canMoveRight(shape) {
    let positions = this.getRightMostBlockPositions(shape);
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x + 1, y)) {
        return false;
      }
    }
    return true;
  }
  canMoveLeft(shape) {
    let positions = this.getLeftMostBlockPositions(shape);
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x - 1, y)) {
        return false;
      }
    }
    return true;
  }

  canRotateRight(shape) {
    this._rotateRight(shape);
    let positions = this.getBlockPositions(shape);
    this._rotateLeft(shape);
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x, y)) {
        return false;
      }
    }
    return true;
  }

  canRotateLeft(shape) {
    this._rotateLeft(shape);
    let positions = this.getBlockPositions(shape);
    this._rotateRight(shape);
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this.isEmpty(x, y)) {
        return false;
      }
    }
    return true;
  }

  areEmptyPositions(positions) {
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i];
      let x = pos[0];
      let y = pos[1];
      if (!this._isEmpty(x, y, this.shapes)) {
        return false;
      }
    }
    return true;
  }

  _isEmpty(x, y, shapes) {
    let isempty = true;
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false
    }

    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      let positions = this.getBlockPositions(shape);
      for (let j = 0; j < positions.length; j++) {
        let pos = positions[j];
        let tx = parseInt(pos[0]);
        let ty = parseInt(pos[1]);
        if (x === tx && y === ty) {
          isempty = false;
          break;
        }
      }
    }
    return isempty;
  }

  isEmpty(x, y) {
    return this._isEmpty(x, y, this.shapes);
  }

  getRightMostBlockPositions(shape) {
    let result = []
    let mat = shape.rotations[shape.orientation];
    for (let r = 0; r < shape.size; r++) {
      let rightmostx = -1;
      for (let c = 0; c < shape.size; c++) {
        if (mat[r][c] > 0) {
          rightmostx = c;
        }
      }
      if (rightmostx > -1) {
        result.push([shape.cornerx + rightmostx, shape.cornery + r]);
      }
    }
    return result;
  }

  getLeftMostBlockPositions(shape) {
    let result = []
    let mat = shape.rotations[shape.orientation];
    for (let r = 0; r < shape.size; r++) {
      let leftmostx = -1;
      for (let c = shape.size - 1; c >= 0; c--) {
        if (mat[r][c] > 0) {
          leftmostx = c;
        }
      }
      if (leftmostx > -1) {
        result.push([shape.cornerx + leftmostx, shape.cornery + r]);
      }
    }
    return result;
  }

  getLowestBlockPositions(shape) {
    let result = []
    let mat = shape.rotations[shape.orientation];
    for (let c = 0; c < shape.size; c++) {
      let lowesty = -1;
      for (let r = 0; r < shape.size; r++) {
        if (mat[r][c] > 0) {
          lowesty = r;
        }
      }
      if (lowesty > -1) {
        result.push([shape.cornerx + c, shape.cornery + lowesty]);
      }
    }
    return result;
  }

  getBlockPositions(shape) {
    if (shape === undefined) { return [] }
    let positions = [];
    let matrix = shape.rotations[shape.orientation];
    for (let r = 0; r < shape.size; r++) {
      for (let c = 0; c < shape.size; c++) {
        if (matrix[r][c] > 0) {
          positions.push([shape.cornerx + c, shape.cornery + r]);
        }
      }
    }
    return positions;
  }

  _rotateRight(shape) {
    if (shape.orientation === shape.rotations.length - 1) {
      shape.orientation = 0;
    } else {
      shape.orientation += 1;
    }
  }

  _rotateLeft(shape) {
    if (shape.orientation === 0) {
      shape.orientation = shape.rotations.length - 1;
    } else {
      shape.orientation -= 1;
    }
  }


  getAllShapes() {
    let shapes = [];
    for (let i = 0; i < this.shapes.length; i++) {
      shapes.push(this.shapes[i]);
    }
    if (this.fallingShape) {
      shapes.push(this.fallingShape);
    }
    return shapes;
  }

  signalLinesRemoved(count) {
    let obs = this.observers.linesremoved;
    if (!obs) { return }
    for (let i = 0; i < obs.length; i++) {
      obs[i].linesRemoved(count);
    }
  }

  signalFallingShapeMoved() {
    let obs = this.observers.fallingshapemoved;
    if (!obs) { return }
    for (let i = 0; i < obs.length; i++) {
      obs[i].fallingShapeMoved(this.fallingShape);
    }
  }

  signalStaticShapesChanged() {
    let obs = this.observers.staticshapeschanged;
    if (!obs) { return }
    for (let i = 0; i < obs.length; i++) {
      obs[i].staticShapesChanged(this.shapes);
    }
  }

  signalStaticTetrominosChanged() {
    let obs = this.observers.statictetrominoschanged;
    if (!obs) { return }
    for (let i = 0; i < obs.length; i++) {
      obs[i].staticTetrominosChanged(this.getStaticTetrominoPositionsAndColors());
    }
  }

  signalFallingTetrominoChanged() {
    let obs = this.observers.fallingtetrominochanged;
    if (!obs) { return }
    for (let i = 0; i < obs.length; i++) {
      obs[i].fallingTetrominoChanged(this.getFallingTetrominoPositionAndColor());
    }
  }

  addObserver(type, object) {
    if (!this.observers) {
      this.observers = {};
    }
    if (!this.observers[type]) {
      this.observers[type] = [object];
    } else {
      this.observers[type].push(object);
    }
  }

  getFallingTetrominoPositionAndColor() {
    if (!this.fallingShape) {
      return undefined;
    }
    return { 'color': this.fallingShape.color, 'positions': this.getBlockPositions(this.fallingShape) };
  }

  getStaticTetrominoPositionsAndColors() {
    let result = []
    for (let i = 0; i < this.shapes.length; i++) {
      let shape = this.shapes[i];
      let temp = { 'color': shape.color, 'positions': this.getBlockPositions(shape) };
      result.push(temp);
    }
    return result;
  }

  toString() {
    let str = '';
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        str += '.';
      }
      str += '\n';
    }
    let shapes = this.getAllShapes();
    let width = this.width;
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      let positions = this.getBlockPositions(shape);
      for (let i = 0; i < positions.length; i++) {
        let pos = positions[i];
        let x = parseInt(pos[0]);
        let y = parseInt(pos[1]);
        let j = x + y * (width + 1);
        str = str.substring(0, j) + shape.color + str.substring(j + 1);
      }
    }
    return str;
  }

  toString() {
    let str = '';
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        str += '.';
      }
      str += '\n';
    }
    let falling = this.getFallingTetrominoPositionAndColor();
    let statics = this.getStaticTetrominoPositionsAndColors();
    if (falling) {
      statics.push(falling);
    }
    for (let i = 0; i < statics.length; i++) {
      let temp = statics[i];
      let positions = temp.positions;
      let color = temp.color;
      for (let s = 0; s < positions.length; s++) {
        let pos = positions[s];
        let x = parseInt(pos[0]);
        let y = parseInt(pos[1]);
        let j = x + y * (this.width + 1);
        str = str.substring(0, j) + color + str.substring(j + 1);
      }
    }
    return str;
  }

  toString() {
    let str = '';
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        if (this.gameField[r][c] === undefined) {
          str += '.';
        } else {
          str += this.gameField[r][c];
        }
      }
      str += '\n';
    }
    let positions = this.getBlockPositions(this.fallingShape);
    for (let i = 0; i < positions.length; i++) {
      let row = positions[i][1];
      let col = positions[i][0];
      let index = row * (this.width + 1) + col;
      str = str.substring(0, index) + this.fallingShape.color + str.substring(index + 1);
    }
    return str;
  }
}
export default Board;