export class Tetromino {
    static T_SHAPE = 0;

    static getBlockCoordinates(shape){
        if (shape === this.T_SHAPE){
            return [(0,0),(-1,0), (0,1), (1,0)];
        }
    }
    static
}