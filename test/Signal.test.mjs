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
        expect(Observer.count).to.eql(1);
    });
    it("move falling tetromino around and send signal each time", () => {
        let Observer = {
            shape: undefined,
            fallingShapeMoved: function (shape) {
                this.shape = shape;
            }
        }
        board.addObserver('fallingshapemoved', Observer);
        board.drop(Tetromino.T_SHAPE);
        expect(Observer.shape.cornerx).to.eql(board.fallingShape.cornerx);
        board.moveLeft();
        expect(Observer.shape.cornerx).to.eql(board.fallingShape.cornerx);
        board.moveRight();
        expect(Observer.shape.cornerx).to.eql(board.fallingShape.cornerx);
        board.tick();
        expect(Observer.shape.cornery).to.eql(board.fallingShape.cornery);
        board.rotateLeft();
        expect(Observer.shape.orientation).to.eql(board.fallingShape.orientation);
        board.rotateRight();
        expect(Observer.shape.orientation).to.eql(board.fallingShape.orientation);
    });
    it("send signal when static shapes list change", () => {
        let Observer = {
            shapes: undefined,
            staticShapesChanged: function (shapes) {
                this.shapes = shapes;
            }
        }
        board.addObserver('staticshapeschanged', Observer);
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
        expect(Observer.shapes.length).to.eql(board.shapes.length);
    });
    if ("send signal when game is over", () => {
        let Observer = {
            points: undefined,
            gameOver: function (points) {
                this.points = points;
            }
        }
        board.addObserver('staticshapeschanged', Observer);
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        expect(Observer.points).to.be(0);
    });
});