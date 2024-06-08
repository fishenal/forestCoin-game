import { Container, Graphics, Text } from 'pixi.js';

export class PlaceHolder extends Container {
    // public number: number;
    constructor({ number, size }: { number: number; size: number }) {
        super();
        this.width = size;
        this.height = size;
        const text = new Text({
            text: String(number),
            style: {
                fontFamily: 'CherrySwashB',
                fill: 0x69a5c9,
                fontSize: 40,
            },
        });
        text.anchor = 0.5;
        this.pivot.x = (size / 2) * -1;
        this.pivot.y = (size / 2) * -1;
        const bg = new Graphics();
        bg.circle(0, 0, size / 2);
        bg.fill(0xbbdcee);

        this.addChild(bg);
        this.addChild(text);
    }
}
