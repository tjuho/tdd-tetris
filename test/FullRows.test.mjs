import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}


describe("Removing full rows", () => {
  let board;
  let Observer
  beforeEach(() => {
    board = new Board(9, 6);
  });

  it("create a full row and remove it", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `.........
            .........
            .........
            .........
            .........
            .T..T..T.`
    );
  });
  it("create a full row and remove it", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.........
      ....T....
            ...TTT...
            .........
            .........
            .T..T..T.`
    );

  });
});