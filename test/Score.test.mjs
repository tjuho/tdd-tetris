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
    beforeEach(() => {
        board = new Board(9, 6);
    });

    it("start score is 0", () => {
        expect(board.score.getScore()).to.equal(0);
    });
    it("check score after removing a row", () => {
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
        expect(board.score.getScore()).to.equal(40);
    });
});