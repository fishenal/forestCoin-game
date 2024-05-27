import { Container, Text } from 'pixi.js';
import { Head } from './Head';

export class Workline extends Container {
    private hidArr: number[] = [];
    constructor() {
        super();
    }
    public show() {
        this.removeChildren();
        this.hidArr.map((hid, idx) => {
            const head = new Head({ hid });
            head.x = 60 * idx;
            this.addChild(head);
        });
        const lText = new Text({
            text: String(this.hidArr.length),
            style: {
                fontFamily: 'Shrikhand',
                fill: 0x000000,
            },
        });
        lText.y = 100;
        lText.x = 100;

        this.addChild(lText);
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
        }
    }
}
