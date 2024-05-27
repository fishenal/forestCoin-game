import { Sprite, Texture } from 'pixi.js';

export class Head extends Sprite {
    public hid: number;
    public colIdx: number;
    public rowIdx: number;
    constructor({ hid, ridx, cidx }: { hid: number; ridx?: number; cidx?: number }) {
        super({
            texture: Texture.from(`head/h${hid}`),
            width: 50,
            height: 50,
        });
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.hid = hid;
        this.rowIdx = ridx || 0;
        this.colIdx = cidx || 0;
    }
}
