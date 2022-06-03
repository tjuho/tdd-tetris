import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

describe("Wall bouncing T tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
        board.drop(Tetromino.T_SHAPE);
    });
    it("start from the top middle", () => {
        expect(board.toString()).to.equalShape(
            `....T.....
             ...TTT....
             ..........
             ..........
             ..........
             ..........`
        );
    });
    it("move to left wall and rotate with bounce", () => {
        board.rotateRight();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `.T........
             TTT.......
             ..........
             ..........
             ..........
             ..........`
        );
    });
    it("move to right wall wall and rotate with bounce", () => {
        board.rotateLeft();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `..........
             .......TTT
             ........T.
             ..........
             ..........
             ..........`
        );
    });
    it("a block prevents bouncing", () => {
        board.rotateRight();
        board.moveLeft();
        board.moveLeft();
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.tick();
        board.tick();
        board.rotateRight();
        expect(board.toString()).to.equalShape(
            `..........
       ..........
       .T........
       TTT.......
       .TTT......
       ..T.......`
        );
    });

});