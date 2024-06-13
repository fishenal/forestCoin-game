import { Container, Text } from 'pixi.js';
import { navigation } from '../navigation';
import { FailPopup } from './FailPopup';
import { setup } from './Setup';
import { sfx } from '../utils/audio';

const width = 200;
const height = 30;
// const defaultSec = 200;
export class Countdownline extends Container {
    public second: number;
    // private plate: Graphics;
    private intervalId: NodeJS.Timeout | undefined;
    private countDownStr: Text;
    public onThreeRemove: () => void = () => {};
    // public debounceAdd: () => void;
    constructor() {
        super();
        const { countSec } = setup.getConfigData();
        this.second = countSec;
        this.width = width;
        this.height = height;
        this.y = 0;
        this.x = 0;
        // this.plate = new Graphics();
        // this.addChild(this.plate);
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
        this.countDownStr.y = 5;
        this.countDownStr.x = 10;
        this.addChild(this.countDownStr);
        // this.plate.alpha = 0.5;
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
        // this.second = this.defaultSec;
        // this.countDownStr.text = this.getTimeStr();
    }

    public show() {
        // this.plate.roundRect(0, 0, innerWidth, height);
        // this.plate.fill(0xd3d3d3);
        // this.plate.alpha = 0.6;
        const { countSec } = setup.getConfigData();
        this.second = countSec;
        this.countDownStr.text = this.getTimeStr();
        this.starCount();
    }
    private onCountend() {
        navigation.showOverlay(FailPopup);
    }
}
export const countdownline = new Countdownline();
