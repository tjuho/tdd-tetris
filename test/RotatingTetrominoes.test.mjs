
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientationsCount(tetromino) {
  let board = new Board(6, 9)
  board.drop(tetromino)
  board.tick()
  board.tick()
  board.tick()
  const distinct = new Set();
  for (let i = 0; i < 10; i++) {
    distinct.add(board.toString());
    board.rotateRight();
  }
  for (let i = 0; i < 10; i++) {
    distinct.add(board.toString());
    board.rotateLeft();
  }
  return distinct.size;
}


describe("The I shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(4, 4);
    board.drop(Tetromino.I_SHAPE);
    board.tick();
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `....
       IIII
       ....
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });
  it("can be rotated left/counter-clockwise whole spin", () => {
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....
       IIII
       ....
       ....`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientationsCount(Tetromino.I_SHAPE)).to.equal(2);
  });
});



describe("The O shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(2, 2);
    board.drop(Tetromino.O_SHAPE);
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `OO
       OO`
    );
  });
  it("cannot be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `OO
       OO`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `OO
       OO`
    );
  });

  it("has 1 distinct orientations", () => {
    expect(distinctOrientationsCount(Tetromino.O_SHAPE)).to.equal(1);
  });
});

describe("The left L shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(3, 3);
    board.drop(Tetromino.LL_SHAPE);
    board.tick();
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `...
        LLL
         ..L`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.LL
         .L.
         .L.`
    );
  });


  it("can be rotated 2x left/counter-clockwise", () => {
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...
         L..
         LLL`
    );
  });

  it("can be rotated 3x left/counter-clockwise whole spin", () => {
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.L.
       .L.
       LL.`
    );
  });
  it("can be rotated left/counter-clockwise whole spin", () => {
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...
       LLL
       ..L`
    );
  });

  it("can be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.L.
       .L.
       LL.`
    );
  });

  it("can be rotated 2x right/clockwise", () => {
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...
         L..
         LLL`
    );
  });
  it("can be rotated 3x right/clockwise", () => {
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.LL
         .L.
         .L.`
    );
  });

  it("can be rotated right/clockwise whole spin", () => {
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...
        LLL
         ..L`
    );
  });
  it("has 4 distinct orientations", () => {
    expect(distinctOrientationsCount(Tetromino.LL_SHAPE)).to.equal(4);
  });
});
describe("The right L shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(3, 3);
    board.drop(Tetromino.LR_SHAPE);
    board.tick();
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `...
        KKK
         K..`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.K.
         .K.
         .KK`
    );
  });


  it("can be rotated 2x left/counter-clockwise", () => {
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...
         ..K
         KKK`
    );
  });

  it("can be rotated 3x left/counter-clockwise whole spin", () => {
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `KK.
       .K.
       .K.`
    );
  });
  it("can be rotated left/counter-clockwise whole spin", () => {
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...
        KKK
         K..`
    );
  });

  it("can be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `KK.
       .K.
       .K.`
    );
  });

  it("can be rotated 2x right/clockwise", () => {
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...
         ..K
         KKK`
    );
  });
  it("can be rotated 3x right/clockwise", () => {
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.K.
         .K.
         .KK`
    );
  });

  it("can be rotated right/clockwise whole spin", () => {
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...
        KKK
         K..`
    );
  });
  it("has 4 distinct orientations", () => {
    expect(distinctOrientationsCount(Tetromino.LR_SHAPE)).to.equal(4);
  });
});
describe("The right S shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(3, 3);
    board.drop(Tetromino.SR_SHAPE);
    board.tick();
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `...
        .AA
         AA.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `A..
         AA.
         .A.`
    );
  });


  it("can be rotated 2x left/counter-clockwise", () => {
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...
        .AA
         AA.`
    );
  });


  it("can be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `A..
         AA.
         .A.`
    );
  });

  it("can be rotated 2x right/clockwise", () => {
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...
        .AA
         AA.`
    );
  });
  it("has 2 distinct orientations", () => {
    expect(distinctOrientationsCount(Tetromino.SR_SHAPE)).to.equal(2);
  });
});
describe("The left S shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(3, 3);
    board.drop(Tetromino.SL_SHAPE);
    board.tick();
  });

  it("initial orientation", () => {
    expect(board.toString()).to.equalShape(
      `...
        SS.
         .SS`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..S
         .SS
         .S.`
    );
  });


  it("can be rotated 2x left/counter-clockwise", () => {
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...
        SS.
         .SS`
    );
  });


  it("can be rotated right/clockwise", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..S
         .SS
         .S.`
    );
  });

  it("can be rotated 2x right/clockwise", () => {
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...
        SS.
         .SS`
    );
  });
  it("has 2 distinct orientations", () => {
    expect(distinctOrientationsCount(Tetromino.SL_SHAPE)).to.equal(2);
  });
});