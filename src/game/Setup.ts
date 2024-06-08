import { designConfig } from '../utils/designConfig';

interface Config {
    coinWidth: number;
    innerWidth: number;
    gap: number;
    row: number;
    col: number;
    hitLine: number;
    blockLine: number;
    countSec?: number;
    toolNum?: number[];
}

export class Setup {
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
            // countSec:
        },
        2: {
            coinWidth: 60,
            innerWidth: 590,
            gap: 5,
            row: 9,
            col: 9,
            hitLine: 3,
            blockLine: 0,
        },
        3: {
            coinWidth: 90,
            innerWidth: 575,
            gap: 5,
            row: 6,
            col: 6,
            hitLine: 1,
            blockLine: 0,
        },
        4: {
            coinWidth: 90,
            innerWidth: 575,
            gap: 5,
            row: 6,
            col: 6,
            hitLine: 1,
            blockLine: 2,
        },
        5: {
            coinWidth: 60,
            innerWidth: 590,
            gap: 5,
            row: 9,
            col: 9,
            hitLine: 1,
            blockLine: 4,
        },
        6: {
            coinWidth: 60,
            innerWidth: 590,
            gap: 5,
            row: 9,
            col: 9,
            hitLine: 1,
            blockLine: 7,
        },
    };

    public level: number = 2;
    public getConfigData = (): Config => {
        return this.levelData[this.level];
    };
}

export const setup = new Setup();
