
import { expect } from "chai";
import { TShape, IShape, OShape } from "../src/Shape.mjs";
/*
function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  let shape;
  beforeEach(() => {
    shape = new TShape('T');
  });

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });

  it("can be rotated right/clockwise", () => {
    shape.rotateRight();
    expect(shape.toString()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    shape.rotateLeft();
    expect(shape.toString()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    shape.rotateLeft();
    shape.rotateLeft();
    expect(shape.toString()).to.equalShape(
      `...
       TTT
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise whole spin", () => {
    shape.rotateLeft();
    shape.rotateLeft();
    shape.rotateLeft();
    shape.rotateLeft();
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });
  it("can be rotated right/clockwise whole spin", () => {
    shape.rotateRight();
    shape.rotateRight();
    shape.rotateRight();
    shape.rotateRight();
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });
});



describe("The I shape", () => {
  let shape;
  beforeEach(() => {
    shape = new IShape('I');
  });

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       ....
       IIII
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    shape.rotateRight();
    expect(shape.toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    shape.rotateLeft();
    expect(shape.toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});



describe("The O shape", () => {
  let shape;
  beforeEach(() => {
    shape = new OShape('O');
  });

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `OO
       OO`
    );
  });
  it("cannot be rotated right/clockwise", () => {
    shape.rotateRight();
    expect(shape.toString()).to.equalShape(
      `OO
       OO`
    );
  });

  xit("cannot be rotated left/counter-clockwise", () => {
    shape.rotateLeft();
    expect(shape.toString()).to.equalShape(
      `OO
       OO`
    );
  });

  xit("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
  
});

*/