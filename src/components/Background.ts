import { Sprite, Texture } from 'pixi.js';

export class Background extends Sprite {
    constructor() {
        super();
    }
    show() {
        this.texture = Texture.from('bg');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // this.scale = Math.min(this.scale.x, this.scale.y);
        this.x = window.innerWidth * 0.5 - this.width * 0.5;
    }
    resize(w: number, h: number) {
        console.log(w, h);
        this.width = w;
        this.height = h;
        this.x = w * 0.5 - this.width * 0.5;
    }
}
export const background = new Background();
