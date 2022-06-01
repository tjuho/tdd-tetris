export class Tetromino {
    static T_SHAPE = {rotations: [[[0,1,0],[2,3,4],[0,0,0]],[[0,2,0],[0,3,1],[0,4,0]],[[0,0,0],[4,3,2],[0,1,0]],[[0,4,0],[1,3,0],[0,2,0]]],
        orientation: 0,
        color: 'T',
        cornerx: 0,
        cornery: 0
     };
     static LR_SHAPE = {rotations: [[[0,1,1],[0,1,0],[0,1,0]],[[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]],[[1,0,0],[1,1,1],[0,0,0]]],
              orientation: 0,
              color: 'L',
              cornerx: 0,
              cornery: 0
           };
           static LL_SHAPE = {rotations: [[[1,1,0],[0,1,0],[0,1,0]],[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]]],
                   orientation: 0,
                   color: 'L',
                   cornerx: 0,
                   cornery: 0
                   };
                   static SL_SHAPE = {rotations: [[[0,0,1],[0,1,1],[0,1,0]],[[1,1,0],[0,1,1],[0,0,0]]],
                           orientation: 0,
                           color: 'S',
                           cornerx: 0,
                           cornery: 0
                           };
                           static SR_SHAPE = {rotations: [[[0,1,0],[0,1,1],[0,0,1]],[[0,1,1],[1,1,0],[0,0,0]]],
                                   orientation: 0,
                                   color: 'S',
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
        color: 'O',
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