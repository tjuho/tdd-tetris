
export class Shape{
    orientation
    rotations 
    color
    size
    cx
    cy 
    constructor(color, rotations){
        this.orientation = 0;
        this.color = color;
        this.rotations = rotations;
        this.size = rotations[0].length;
        this.cy = 0;
        this.cx = 0;
    }
    rotateRight(){
        if (this.orientation === this.rotations.length - 1){
            this.orientation = 0;
        } else {
            this.orientation += 1;
        }
    }    
    rotateLeft(){
        if (this.orientation === 0){
            this.orientation = this.rotations.length - 1;
        } else {
            this.orientation -= 1;
        }
    }    
    setUpperLeftPosition(cx,cy){
        this.cx = cx;
        this.cy = cy;
    }
    hasBlock(r,c){
        let mat = this.rotations[this.orientation];
        if (r>=0 && r < size && c >= 0 && c < size){
            return mat[r][c] > 0;
        } else { return false; }
    }
    
    size(){
        return this.rotations[0].length
    }

    toString(){
        let res = '';
        let mat = this.rotations[this.orientation];
        for (let r=0;r<this.size;r++){
            for (let c=0; c<this.size;c++){
                if (mat[r][c] > 0){
                    res += this.color;
                } else {
                    res += '.';
                }
            }
            res += '\n'
        }
        return res;
    }

    getBlockPositions(){
        let positions = [];
        let matrix = this.rotations[this.orientation];
        for (let r = 0; r < this.size; r++){
            for (let c = 0; c < this.size; c++){
                if (matrix[r][c] > 0){
                    positions.push([this.cx+c,this.cy+r]);
                }
            }
        }
        return positions;
    }

    getLowestBlockPositions(){
        let result = []
        let mat = this.rotations[this.orientation];
        for (let c = 0; c < this.size; c++){
            let lowesty = -1;
            for (let r = 0; r < this.size; r++){
                if (mat[r][c] > 0){
                    lowesty = r;
                }
            }
            if (lowesty > -1){
                result.push([this.cx+c, this.cy+lowesty]);
            }
        }
        return result;
    }   

    getRightMostBlockPositions(){
        let result = []
        let mat = this.rotations[this.orientation];
        for (let r = 0; r < this.size; r++){
            let rightmostx = -1;
            for (let c = 0; c < this.size; c++){
                if (mat[r][c] > 0){
                    rightmostx = c;
                }
            }
            if (rightmostx > -1){
                result.push([this.cx+rightmostx, this.cy+r]);
            }
        }
        return result;
    }

    getLeftMostBlockPositions(){
        let result = []
        let mat = this.rotations[this.orientation];
        for (let r = 0; r < this.size; r++){
            let leftmostx = -1;
            for (let c = this.size - 1; c >= 0; c--){
                if (mat[r][c] > 0){
                    leftmostx = c;
                }
            }
            if (leftmostx > -1){
                result.push([this.cx+leftmostx, this.cy+r]);
            }
        }
        return result;
    }
    removeRow(rowIndex){
        if (rowIndex >= this.cy && rowIndex < this.cy + this.size){
            let shapeRowIndex = rowIndex - this.cy;
            let mat = this.rotations[this.orientation];
            mat[shapeRowIndex] = Array(this.size).fill(0);
        }
    }
}

export class TShape extends Shape{
    constructor(color){
        super(color, 
            [[[0,1,0],[2,3,4],[0,0,0]],[[0,2,0],[0,3,1],[0,4,0]],[[0,0,0],[4,3,2],[0,1,0]],[[0,4,0],[1,3,0],[0,2,0]]]
            );
    }
}
export class IShape extends Shape{
    constructor(color){
        super(color, 
            [[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]]
            );
    }
}
export class OShape extends Shape{
    constructor(color){
        super(color, 
            [[[1,1],[1,1]]]
            );
    }
}

export class SingleShape extends Shape{
    constructor(color){
        super(color, [[[1]]]);
    }
}

export class Type {
    static T_SHAPE = {rotations: [[[0,1,0],[2,3,4],[0,0,0]],[[0,2,0],[0,3,1],[0,4,0]],[[0,0,0],[4,3,2],[0,1,0]],[[0,4,0],[1,3,0],[0,2,0]]],
                    orientation: 0,
                    color: 'T',
                    cornerx: 0,
                    cornery: 0
                 };
    static I_SHAPE = {rotations: [[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]],
                    orientation: 0,
                    color: 'I',
                    cornerx: 0,
                    cornery: 0
                    };
    static O_SHAPE = {rotations: [[[1,1],[1,1]]],
                    orientation: 0,
                    color: 'I',
                    cornerx: 0,
                    cornery: 0
                    };
    static X_SHAPE = 
        {rotations: [[[1]]],
        orientation: 0,
        color: 'X',
        cornerx: 0,
        cornery: 0
        };
    static Y_SHAPE = 
        {rotations: [[[1]]],
        orientation: 0,
        color: 'Y',
        cornerx: 0,
        cornery: 0
        };
}