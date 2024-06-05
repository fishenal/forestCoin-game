import { Container, Sprite, Texture } from 'pixi.js';

export class Stars extends Container {
    private starNum: number;
    private lightenNum: number;
    private size: number = 30;
    constructor(lightenNum: number, size?: number) {
        super();
        this.starNum = 3;
        this.size = size || 30;
        this.lightenNum = lightenNum;

        this.x = 0;
        this.y = 0;
        // this.width = 200;
        // this.height = 200;
    }
    show() {
        const starOff = Texture.from('Icon_StarOff');
        const starOn = Texture.from('Icon_StarOn');

        for (let i = 0; i < this.starNum; i++) {
            if (i < this.lightenNum) {
                this.addChild(
                    new Sprite({
                        texture: starOn,
                        width: this.size,
                        height: this.size,
                        x: i * this.size * 1.2,
                    }),
                );
            } else {
                this.addChild(
                    new Sprite({
                        texture: starOff,
                        width: this.size,
                        height: this.size,
                        x: i * this.size * 1.2,
                    }),
                );
            }
        }
    }
}
