import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling and sideways moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  it("check if tetromino can move left", () => {
    expect(board.canMoveLeft(board.fallingShape)).to.be.true;
  });
  it("check if tetromino can move right", () => {
    expect(board.canMoveRight(board.fallingShape)).to.be.true;
  });
  it("start from the top middle", () => {
    expect(board.toString()).to.equalShape(
      `...TTT....
         ....T.....
         ..........
         ..........
         ..........
         ..........`
    );
  });

  it("move tetromino right", () => {
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("move tetromino left", () => {
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("move tetromino all the way left so that it hits the boundaries", () => {
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("move tetromino right so that it hits the boundaries", () => {
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they land on another block with one sidestep", () => {
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
         ..........
         ..........
         .....TTT..
         ...TTTT...
         ....T.....`
    );
  });
});

describe("Falling, rotating and sideways moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  it("start from the top middle", () => {
    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("rotate tetromino right/clockwise", () => {
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
            ...TT.....
            ....T.....
            ..........
            ..........
            ..........`
    );
  });
  it("rotate tetromino left/counterclockwise", () => {
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........`
    );
  });

  it("rotate and move against the wall", () => {
    board.tick();
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `........T.
            ........TT
            ........T.
            ..........
            ..........
            ..........`
    );
  });
});