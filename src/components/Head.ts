import { Sprite, Texture } from 'pixi.js';
import { setup } from '../game/Setup';

export class Head extends Sprite {
    public hid: number;
    public xx: number;
    public yy: number;
    constructor({ hid, xx, yy }: { hid: number; xx?: number; yy?: number }) {
        super({
            texture: Texture.from(`head/h${hid}`),
            width: setup.coinWidth,
            height: setup.coinWidth,
        });
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.hid = hid;
        this.xx = xx || 0;
        this.yy = yy || 0;
    }
}
