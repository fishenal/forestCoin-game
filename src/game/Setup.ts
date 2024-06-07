import { designConfig } from '../utils/designConfig';

interface Config {
    coinWidth: number;
    innerWidth: number;
    gap: number;
    row: number;
    col: number;
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
        },
        2: {
            coinWidth: 60,
            innerWidth: 590,
            gap: 5,
            row: 9,
            col: 9,
        },
    };

    public level: number = 2;
    public getConfigData = (): Config => {
        return this.levelData[this.level];
    };
}

export const setup = new Setup();
