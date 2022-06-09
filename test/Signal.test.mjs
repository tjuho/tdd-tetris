import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}


describe("State change and send signal", () => {
    let board;
    let Observer
    beforeEach(() => {
        board = new Board(9, 6);
    });

    it("remove row and send signal", () => {
        let Observer = {
            count: -1,
            linesRemoved: function (count) {
                console.log('called linesrem with count', count)
                this.count = count;
            }
        }
        board.addObserver('linesremoved', Observer);
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
        console.log('add obs test', board.observers)
        expect(Observer.count).to.eql(1);
    });
});