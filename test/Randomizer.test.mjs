import { expect } from "chai";
import { Randomizer } from "../src/Randomizer.mjs";

describe("Testing tetromino randomizer", () => {
    let rand;
    beforeEach(() => {
        rand = new Randomizer();
        rand.add(1, 100);
        rand.add(2, 200);
        rand.add(3, 200);
    });

    it("test equal test", () => {
        let seq1 = [1, 2, 3];
        let seq2 = [1, 2, 3];
        expect(seq1).to.eql(seq2);
    });
    it("test that sequences are different", () => {
        let size = 100
        let seq1 = [];
        let seq2 = [];
        for (let j = 0; j < size; j++) {
            seq1.push(rand.next());
        }
        for (let j = 0; j < size; j++) {
            seq2.push(rand.next());
        }
        expect(seq1).to.not.eql(seq2);
    });
    it("test that every value appears at least once", () => {
        let size = 50
        let seq1 = [];
        let seq2 = [];
        for (let j = 0; j < size; j++) {
            seq1.push(rand.next());
        }
        expect(seq1).to.contain(1);
        expect(seq1).to.contain(2);
        expect(seq1).to.contain(3);
    });
});