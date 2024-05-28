import { Container, Graphics, Text } from 'pixi.js';
import { Head } from '../components/Head';
import { gold } from './Gold';

export class Workline extends Container {
    private hidArr: number[] = [];
    private headContainer: Container;
    private plate: Graphics;
    public onThreeRemove: () => void = () => {};
    constructor() {
        super();
        const width = 60 * 7;
        const height = 60;
        this.width = width;
        this.height = height;
        this.y = 60 * 9 + 20;
        this.x = 0;
        this.headContainer = new Container();
        this.headContainer.x = 5;
        this.headContainer.y = 5;
        this.plate = new Graphics();
        this.plate.rect(0, 0, width, height);
        this.plate.fill(0xa57a7c);

        this.addChild(this.plate);
        this.addChild(this.headContainer);
    }
    public show() {
        this.headContainer.removeChildren();
        this.hidArr.map((hid, idx) => {
            const head = new Head({ hid });
            head.x = 60 * idx;
            this.headContainer.addChild(head);
        });
        if (this.hidArr.length >= 7) {
            window.alert('loss');
        }
        const lText = new Text({
            text: String(this.hidArr.length),
            style: {
                fontFamily: 'Shrikhand',
                fill: 0x000000,
            },
        });
        lText.y = 100;
        lText.x = 100;

        this.headContainer.addChild(lText);
    }
    public addHid(hid: number) {
        this.hidArr.push(hid);
        this.removeThree(hid);
        this.show();
    }
    private removeThree(hid: number) {
        let count = 0;
        this.hidArr.forEach((n) => {
            if (n === hid) {
                count++;
            }
        });
        if (count === 3) {
            this.hidArr = this.hidArr.filter((m) => {
                if (m === hid) {
                    return false;
                } else {
                    return true;
                }
            });
            gold.addCoin(3);
        }
    }
}
export const workLine = new Workline();
