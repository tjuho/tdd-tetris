import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Falling blocks", () => {
  let board;
  beforeEach(() => {
    board = new Board(3, 3);
  });

  it("The board starts empty", () => {
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });

  describe("When a block is dropped", () => {
    beforeEach(() => {
      board.drop(Tetromino.X_SHAPE);
    });

    it("it starts from the top middle", () => {
      expect(board.toString()).to.equalShape(
        `.X.
         ...
         ...`
      );
    });

    it("checks if spot is empty 2", () => {
      expect(board.isEmpty(1, 1)).to.be.true;
    });

    it("it moves down one row per tick", () => {
      board.tick();

      expect(board.toString()).to.equalShape(
        `...
         .X.
         ...`
      );
    });

    it("at most one block may be falling at a time", () => {
      const before = board.toString();
      expect(() => board.drop(Tetromino.Y_SHAPE)).to.throw("already falling");
      const after = board.toString();
      expect(after).to.equal(before);
    });
    it("it moves down one row per tick", () => {
      board.tick();
      board.tick();

      expect(board.toString()).to.equalShape(
        `...
         ...
         .X.`
      );
    });
  });

  describe("When a block reaches the bottom", () => {
    beforeEach(() => {
      board.drop(Tetromino.X_SHAPE);
      board.tick();
      board.tick();

    });

    it("it is still moving on the last row", () => {
      expect(board.toString()).to.equalShape(
        `...
         ...
         .X.`
      );
      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    });

    it("it stops when it hits the bottom", () => {
      board.tick();

      expect(board.toString()).to.equalShape(
        `...
         ...
         .X.`
      );
      expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });
  });

  describe("When a block lands on another block", () => {
    beforeEach(() => {
      board.drop(Tetromino.X_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.drop(Tetromino.Y_SHAPE);
      board.tick();
    });

    it("it is still moving on the row above the other block", () => {
      expect(board.toString()).to.equalShape(
        `...
         .Y.
         .X.`
      );
      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    });

    it("it stops when it hits the other block", () => {
      board.tick();

      expect(board.toString()).to.equalShape(
        `...
         .Y.
         .X.`
      );
      expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });
  });
});