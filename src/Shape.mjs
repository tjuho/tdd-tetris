
class Shape{
    orientation
    rotations 
    color
    size
    cx
    cy 
    constructor(color, rotations, cx){
        this.orientation = 0;
        this.color = color;
        this.rotations = rotations;
        this.size = rotations[0].length
        this.cx = cx
        this.cy = 0
    }
    rotateRight(){
        if (this.orientation - 1 === this.rotations.length){
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

    hasBlock(r,c){
        mat = this.rotations[this.orientation];
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
}

export class TShape extends Shape{
    constructor(color, cx){
        super(color, 
            [[[0,1,0],[2,3,4],[0,0,0]],[[0,2,0],[0,3,1],[0,4,0]],[[0,0,0],[4,3,2],[0,1,0]],[[0,4,0],[1,3,0],[0,2,0]]], 
            cx);
    }
}
export class IShape extends Shape{
    constructor(color, cx){
        super(color, 
            [[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]], 
            cx
            );
    }
}

export class SingleShape extends Shape{
    constructor(color, cx){
        super(color, [[[1]]], cx);
    }
}

