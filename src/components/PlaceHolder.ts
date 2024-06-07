import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { designConfig } from '../utils/designConfig';
import { setup } from '../game/Setup';

const { coinWidth } = setup.getConfigData();
export class PlaceHolder extends Container {
    // public number: number;
    constructor({ number }: { number: number }) {
        super();
        const text = new Text({
            text: String(number),
            style: {
                fontFamily: 'CherrySwashB',
                fill: 0x69a5c9,
                fontSize: 40,
            },
        });
        text.x = this.width / 2;
        text.y = this.height / 2;
        text.anchor = 0.5;
        this.pivot.x = (coinWidth / 2) * -1;
        this.pivot.y = (coinWidth / 2) * -1;
        const bg = new Graphics();
        bg.circle(0, 0, coinWidth / 2);
        bg.fill(0xbbdcee);

        this.addChild(bg);
        this.addChild(text);
    }
}
