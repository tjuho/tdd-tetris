export class Score {
    score;
    level;
    constructor() {
        this.score = 0;
        this.level = 0;
    }

    reset() {
        this.score = 0;
    }

    linesCleared(linecount) {
        switch (linecount) {
            case 1:
                this.score += 40 * (this.level + 1);
                break;
            case 2:
                this.score += 100 * (this.level + 1);
                break;
            case 3:
                this.score += 300 * (this.level + 1);
                break;
            case 4:
                this.score += 1200 * (this.level + 1);
                break;
        }
    }

    getScore() {
        return this.score;
    }

}