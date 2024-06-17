import { Container, Text } from 'pixi.js';
import { navigation } from '../navigation';
import { FailPopup } from './FailPopup';
import { setup } from './Setup';
import { sfx } from '../utils/audio';

export class Countdownline extends Container {
    public second: number;
    private intervalId: NodeJS.Timeout | undefined;
    private countDownStr: Text;
    private levelTitle!: Text;
    public onThreeRemove: () => void = () => {};
    constructor() {
        super();
        const { countSec } = setup.getConfigData();
        this.second = countSec;
        this.y = 5;
        this.x = 0;
        this.countDownStr = new Text({
            text: this.getTimeStr(),
            style: {
                fontFamily: 'CherrySwashB',
                fill: 0xfdf7f0,
                dropShadow: true,
                stroke: {
                    color: 0x301f23,
                    width: 3,
                },
                fontSize: 40,
            },
        });
        // this.countDownStr.y = 5;
        this.countDownStr.x = 10;
        this.addChild(this.countDownStr);
    }
    private getTimeStr() {
        const minutes = Math.floor(this.second / 60);
        const seconds = this.second - minutes * 60;

        return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }
    public starCount() {
        this.intervalId = setInterval(() => {
            this.second -= 1;
            if (this.second <= 5) {
                sfx.play('audio/clock_count.mp3');
            }
            if (this.second <= 0) {
                this.stopCount();
                this.onCountend();
            }
            this.countDownStr.text = this.getTimeStr();
        }, 1000);
    }
    public stopCount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    renderLevel() {
        this.removeChild(this.levelTitle);
        this.levelTitle = new Text({
            text: `LEVEL: ${setup.currentLevel}`,
            style: {
                fontFamily: 'CherrySwashB',
                fill: 0xfdf7f0,
                dropShadow: true,
                stroke: {
                    color: 0x301f23,
                    width: 3,
                },
                fontSize: 35,
            },
        });
        this.levelTitle.y = 5;
        this.levelTitle.x = innerWidth * 0.32;
        this.addChild(this.levelTitle);
    }
    public show() {
        const { countSec } = setup.getConfigData();
        this.second = countSec;
        this.countDownStr.text = this.getTimeStr();
        this.starCount();
        this.renderLevel();
    }
    private onCountend() {
        navigation.showOverlay(FailPopup, {
            type: 'timeout',
        });
    }
}
export const countdownline = new Countdownline();
