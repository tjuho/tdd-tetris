import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

describe("Side wall bouncing T tetromino", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
        board.drop(Tetromino.T_SHAPE);
        board.tick();
    });
    it("start from the top middle", () => {
        expect(board.toString()).to.equalShape(
            `..........
             ...TTT....
             ....T.....
             ..........
             ..........
             ..........`
        );
    });
    it("move to left wall and rotate with bounce", () => {
        board.rotateLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        expect(board.toString()).to.equalShape(
            `T.........
             TT........
             T.........
             ..........
             ..........
             ..........`
        );
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `..........
             .T........
             TTT.......
             ..........
             ..........
             ..........`
        );
    });
    it("move to right wall wall and rotate with bounce", () => {
        board.rotateRight();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.rotateRight();
        expect(board.toString()).to.equalShape(
            `..........
             ........T.
             .......TTT
             ..........
             ..........
             ..........`
        );
    });
    it("a block prevents bouncing", () => {
        board.rotateLeft();
        board.moveLeft();
        board.moveLeft();
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.rotateLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.tick();
        board.tick();
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `..........
       ..........
       T.........
       TTT.......
       T.TT......
       ..T.......`
        );
    });

});
describe("Top side bouncing T tetromino", () => {
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
    it("bounce downwards from the top side", () => {
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
    it("tetrominos below prevent bounce downwards from the top side when rotating left", () => {
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `...TTT....
             ....T.....
             ...TTT....
             ....T.....
             ...TTT....
             ....T.....`
        );
    });
    it("tetrominos below prevent bounce downwards from the top side when rotating right", () => {
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `...TTT....
             ....T.....
             ...TTT....
             ....T.....
             ...TTT....
             ....T.....`
        );
    });
});