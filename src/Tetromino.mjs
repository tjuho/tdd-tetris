export class Tetromino {
    static T_SHAPE = 0;

    static getShape(shape){
        if (shape === this.T_SHAPE){
            return ' T \nTTT'
        }
    }

    static getShapeHeight(shape){
        if (shape === this.T_SHAPE){
            return 2
        }

    }

    static getShapeMid(shape){
        if (shape === this.T_SHAPE){
            return 1
        }

    }

}