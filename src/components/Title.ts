import { Container, Graphics, Text } from 'pixi.js';
import { designConfig } from '../utils/designConfig';

const innerWidth = designConfig.sixContent.width;
export class Title extends Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = innerWidth;
        // this.height = 400;
    }
    show() {
        const board = new Graphics();
        board.roundRect(0, 0, innerWidth, 90);
        board.fill(0xd6ad98);
        board.stroke({
            width: 4,
            color: 0x301f23,
        });
        this.addChild(board);
        const text = new Text({
            text: 'Coin Collection',
            style: {
                fontFamily: 'CherrySwashB',
                fill: 0x000,
                fontSize: 65,
            },
        });
        text.x = 15;
        text.y = 5;
        this.addChild(text);
    }
    resize(w: number, h: number) {
        // this.width = w;
        // this.height = h;
        // this.x = w * 0.5 - this.width * 0.5;
    }
}
export const title = new Title();
