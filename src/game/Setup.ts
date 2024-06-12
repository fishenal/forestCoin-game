interface Config {
    coinWidth: number;
    innerWidth: number;
    gap: number;
    row: number;
    col: number;
    hitLine: number;
    blockLine: number;
    countSec: number;
    toolNum?: number[];
}

export class Setup {
    public levelCount: number = 6;
    public currentLevel: number = 1;
    private levelData: {
        [key: number]: Config;
    } = {
        1: {
            coinWidth: 90,
            innerWidth: 575,
            gap: 5,
            row: 6,
            col: 6,
            hitLine: 3,
            blockLine: 0,
            countSec: 60,
        },
        2: {
            coinWidth: 60,
            innerWidth: 590,
            gap: 5,
            row: 9,
            col: 9,
            hitLine: 3,
            blockLine: 0,
            countSec: 100,
        },
        3: {
            coinWidth: 90,
            innerWidth: 575,
            gap: 5,
            row: 6,
            col: 6,
            hitLine: 1,
            blockLine: 0,
            countSec: 100,
        },
        4: {
            coinWidth: 90,
            innerWidth: 575,
            gap: 5,
            row: 6,
            col: 6,
            hitLine: 1,
            blockLine: 2,
            countSec: 100,
        },
        5: {
            coinWidth: 60,
            innerWidth: 590,
            gap: 5,
            row: 9,
            col: 9,
            hitLine: 1,
            blockLine: 4,
            countSec: 100,
        },
        6: {
            coinWidth: 60,
            innerWidth: 590,
            gap: 5,
            row: 9,
            col: 9,
            hitLine: 1,
            blockLine: 7,
            countSec: 100,
        },
    };

    public getConfigData = (): Config => {
        return this.levelData[this.currentLevel];
    };
}

export const setup = new Setup();
