
class Shape{
    orientation
    rotations 
    color
    size
    constructor(color, rotations){
        this.orientation = 0;
        this.color = color;
        this.rotations = rotations;
        this.size = rotations[0].length
    }
    rotateRight(){
        count = rotations.length
        if (this.orientation - 1 === this.rotations.length){
            this.orientation = 0;
        } else {
            this.orientation += 1;
        }
    }    
    rotateLeft(){
        count = rotations.length
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
    toString(){
        res = '';
        mat = this.rotations[this.orientation];
        for (let r=0;r<this.size;r++){
            for (let c=0; c<this.size;c++){
                if (mat[r][c] > 0){
                    res += this.color;
                } else {
                    res += '.';
                }
            }
        }
        return res;
    }
}

export class TShape extends Shape{
    constructor(color){
        super(color, [[[0,1,0],[2,3,4],[0,0,0]],[[0,2,0],[0,3,1],[0,4,0]],[[0,0,0],[4,3,2],[0,1,0]],[[0,4,0],[1,3,0],[0,2,0]]]);
    }
}
export class IShape extends Shape{
    constructor(color){
        super(color, [[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]]);
    }
}

export class SingleShape extends Shape{
    constructor(color){
        super(color, [[[1]]]);
    }
}

