import { Container, Graphics, Text } from 'pixi.js';
import { designConfig } from '../utils/designConfig';
import { navigation } from '../navigation';
import { FailPopup } from './FailPopup';
import { sfx } from '../utils/audio';

const width = 200;
const height = 30;
const defaultSec = 200;
export class Countdownline extends Container {
    private second: number;
    // private plate: Graphics;
    private intervalId: NodeJS.Timeout | undefined;
    private countDownStr: Text;
    public onThreeRemove: () => void = () => {};
    // public debounceAdd: () => void;
    constructor() {
        super();
        this.second = defaultSec;
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
                fill: 0xffffff,
                fontSize: 40,
            },
        });
        this.countDownStr.y = 10;
        this.countDownStr.x = 10;
        this.addChild(this.countDownStr);
        // this.plate.alpha = 0.5;
    }
    private getTimeStr() {
        const minutes = Math.floor(this.second / 60);
        const seconds = this.second - minutes * 60;

        return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }
    private starCount() {
        this.intervalId = setInterval(() => {
            this.second -= 1;
            if (this.second <= 0) {
                this.stopCount();
                this.onCountend();
            }
            this.countDownStr.text = this.getTimeStr();
            // sfx.play('audio/clock_count.mp3');
        }, 1000);
    }
    private stopCount() {
        this.second = defaultSec;
        clearInterval(this.intervalId);
    }
    public show() {
        // this.plate.roundRect(0, 0, innerWidth, height);
        // this.plate.fill(0xd3d3d3);
        // this.plate.alpha = 0.6;
        this.stopCount();
        this.starCount();
    }
    private onCountend() {
        console.log('count end');
        navigation.showOverlay(FailPopup);
    }
}
export const countdownline = new Countdownline();
