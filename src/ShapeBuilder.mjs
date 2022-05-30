import { IShape, TShape, SingleShape } from "./Shape.mjs";
import { Tetromino } from "./Tetromino.mjs";
export class ShapeBuilder{
    constructor(playAreaWidth){
        this.playAreaWidth = playAreaWidth
    }

    createShape(tetrominoShape, color){
        let newshape;
        switch ( tetrominoShape ){
            case Tetromino.T_SHAPE:
              newshape = new TShape('T');
              break;
            case Tetromino.I_SHAPE:
              newshape = new IShape('I');
              break;
            case Tetromino.Y_SHAPE:
              newshape = new SingleShape('Y');
              break;
            case Tetromino.X_SHAPE:
              newshape = new SingleShape('X');
              break;
        }
        if (newshape){
            let topleftcornerx = parseInt((this.playAreaWidth - newshape.size)/2);
            newshape.setUpperLeftPosition(topleftcornerx, 0);
        }
        return newshape;
    }
}