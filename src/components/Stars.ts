import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';
import { designConfig } from '../utils/designConfig';

export class Stars extends Container {
    private starNum: number;
    private lightenNum: number;
    constructor(lightenNum: number) {
        super();
        this.starNum = 3;
        this.lightenNum = lightenNum;

        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 200;
    }
    show() {
        const starOff = Texture.from('Icon_StarOff');
        const starOn = Texture.from('Icon_StarOn');

        for (let i = 0; i < this.starNum; i++) {
            if (i < this.lightenNum) {
                this.addChild(
                    new Sprite({
                        texture: starOn,
                        width: 30,
                        height: 30,
                        x: i * 35,
                    }),
                );
            } else {
                this.addChild(
                    new Sprite({
                        texture: starOff,
                        width: 30,
                        height: 30,
                        x: i * 35,
                    }),
                );
            }
        }
    }
}
