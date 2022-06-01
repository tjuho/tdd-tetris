
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import {Tetromino} from "../src/Tetromino.mjs";

function distinctOrientations(board) {
  const distinct = new Set();
  let goingRight = board;
  let goingLeft = board;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(3, 3);
    board.drop(Tetromino.T_SHAPE);
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });

  it("can be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...
       TTT
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise whole spin", () => {
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });
  it("can be rotated right/clockwise whole spin", () => {
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });
});



describe("The I shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(4, 4);
    board.drop(Tetromino.I_SHAPE);
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `....
       ....
       IIII
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(board).size).to.equal(2);
  });
});



describe("The O shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(2, 2);
    board.drop(Tetromino.O_SHAPE);
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `OO
       OO`
    );
  });
  it("cannot be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `OO
       OO`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `OO
       OO`
    );
  });

  it("has 1 distinct orientations", () => {
    expect(distinctOrientations(board).size).to.equal(1);
  });
  
});

