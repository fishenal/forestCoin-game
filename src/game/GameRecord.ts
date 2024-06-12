import { emitter } from '../store/emitter';
import { setup } from './Setup';

interface GameData {
    levels: {
        [level: number]: {
            star: number;
            lock: boolean;
        };
    };
}

const gameDataKey = 'forest_coin_game_data';
export class GameRecord {
    public gameData: GameData;
    constructor() {
        this.gameData = {
            levels: {},
        };
        if (localStorage.getItem(gameDataKey) !== null) {
            this.gameData = JSON.parse(localStorage.getItem(gameDataKey) as string);
        } else {
            this.initData();
        }
        emitter.on('onWin', (star: number) => {
            this.handleWin(star);
        });
    }
    private initData() {
        for (let i = 0; i < setup.levelCount; i++) {
            this.gameData.levels[i] = {
                star: 1,
                lock: i !== 0,
            };
        }
        localStorage.setItem(gameDataKey, JSON.stringify(this.gameData));
    }
    private handleWin(star: number) {
        if (star > this.gameData.levels[setup.currentLevel].star) {
            this.setGameLevel(setup.currentLevel, star, false);
        }
    }
    public setGameLevel(level: keyof GameData['levels'], star: number, lockStatus: boolean = false) {
        this.gameData.levels[level] = {
            star,
            lock: lockStatus,
        };
        localStorage.setItem(gameDataKey, JSON.stringify(this.gameData));
    }
}

export const gameRecord = new GameRecord();
