import { setup } from './Setup';

interface GameData {
    levels: {
        [level: number]: {
            star: number;
            lock: boolean;
        };
    };
}

export class GameRecord {
    public gameData: GameData;
    constructor() {
        this.gameData = {
            levels: {},
        };
        for (let i = 0; i < setup.levelCount; i++) {
            this.gameData.levels[i] = {
                star: 1,
                lock: i !== 0,
            };
        }
    }

    public setGameData(level: keyof GameData['levels'], star: number) {
        this.gameData.levels[level] = {
            star,
            lock: false,
        };
    }
}

export const gameRecord = new GameRecord();
