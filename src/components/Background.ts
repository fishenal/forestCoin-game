import { Sprite, Texture } from 'pixi.js';

export class Background extends Sprite {
    constructor() {
        super();
    }
    show() {
        this.texture = Texture.from('bg');
    }
    resize(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.anchor = 0.5;
        this.x = w * 0.5;
        this.y = h * 0.5;
        this.scale = 1.5;
        // this.x = w * 0.5 - this.width * 0.5;
    }
}
export const background = new Background();
