import { emitter } from '../store/emitter';
import { bgm, sfx } from '../utils/audio';
import { setup } from './Setup';

interface GameData {
    sound: boolean;
    music: boolean;
    levels: {
        [level: number]: {
            star: number;
            lock: boolean;
        };
    };
}

// const dataPortal = window.localStorage;
// const dataPortal = window.CrazyGames.SDK.data;

const gameDataKey = 'forest_coin_game_data';
export class GameRecord {
    public gameData: GameData;
    constructor() {
        this.gameData = {
            sound: true,
            music: true,
            levels: {},
        };
    }
    public init() {
        if (window.CrazyGames.SDK.data.getItem(gameDataKey) !== null) {
            this.gameData = JSON.parse(window.CrazyGames.SDK.data.getItem(gameDataKey) as string);
        } else {
            this.initData();
        }
        this.initSound();
        emitter.on('onWin', (star: number) => {
            this.handleWin(star);
        });
    }
    private initSound() {
        if (this.gameData.sound) {
            sfx.setVolume(1);
        } else {
            sfx.setVolume(0);
        }
        if (this.gameData.music) {
            bgm.setVolume(1);
        } else {
            bgm.setVolume(0);
        }
    }
    private initData() {
        for (let i = 1; i <= setup.levelCount; i++) {
            this.gameData.levels[i] = {
                star: 0,
                lock: i !== 1,
            };
        }
        window.CrazyGames.SDK.data.setItem(gameDataKey, JSON.stringify(this.gameData));
    }
    private handleWin(star: number) {
        if (star > this.gameData.levels[setup.currentLevel].star) {
            this.setGameLevel(setup.currentLevel, star, false);
        }
        if (this.gameData.levels[setup.currentLevel + 1] && this.gameData.levels[setup.currentLevel + 1].lock) {
            this.gameData.levels[setup.currentLevel + 1].lock = false;
            window.CrazyGames.SDK.data.setItem(gameDataKey, JSON.stringify(this.gameData));
        }
    }

    public setGameLevel(level: keyof GameData['levels'], star: number, lockStatus: boolean = false) {
        this.gameData.levels[level] = {
            star,
            lock: lockStatus,
        };
        window.CrazyGames.SDK.data.setItem(gameDataKey, JSON.stringify(this.gameData));
    }

    public toggleSound() {
        this.gameData.sound = !this.gameData.sound;
        if (this.gameData.sound) {
            sfx.setVolume(1);
        } else {
            sfx.setVolume(0);
        }
        window.CrazyGames.SDK.data.setItem(gameDataKey, JSON.stringify(this.gameData));
    }
    public toggleMusic() {
        this.gameData.music = !this.gameData.music;
        if (this.gameData.music) {
            bgm.setVolume(1);
        } else {
            bgm.setVolume(0);
        }
        window.CrazyGames.SDK.data.setItem(gameDataKey, JSON.stringify(this.gameData));
    }
}

export const gameRecord = new GameRecord();
