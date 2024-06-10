import { Sprite, Container } from 'pixi.js';
import gsap from 'gsap';
export class Head extends Container {
    public hid: number;
    public xx: number;
    public yy: number;
    private _width: number;
    private _height: number;
    public headSpr!: Sprite;
    public onClick: (head: Head) => void = () => {};
    constructor({
        hid,
        xx,
        yy,
        width,
        height,
    }: {
        hid: number;
        xx?: number;
        yy?: number;
        width: number;
        height: number;
    }) {
        super();
        this.width = width;
        this.height = height;
        this._width = width;
        this._height = height;
        this.eventMode = 'static';
        this.cursor = 'pointer';

        // const text = new Text({
        //     text: String(hid),
        // });
        // this.addChild(text);
        this.renderHead(hid);

        this.hid = hid;
        this.xx = xx || 0;
        this.yy = yy || 0;
    }
    private renderHead(hid: number) {
        this.removeChild(this.headSpr);
        this.headSpr = Sprite.from(`head/h${hid}`);
        this.headSpr.width = this._width;
        this.headSpr.height = this._height;
        this.headSpr.anchor = 0.5;
        this.headSpr.on('pointerenter', () => {
            this.headSpr.scale.x *= 1.1;
            this.headSpr.scale.y *= 1.1;
        });
        this.headSpr.on('pointerleave', () => {
            this.headSpr.scale.x /= 1.1;
            this.headSpr.scale.y /= 1.1;
        });

        this.headSpr.eventMode = 'static';
        this.addChild(this.headSpr);
        gsap.from(this.headSpr, {
            alpha: 0,
            duration: 0.4,
            ease: 'power1.out',
        });
    }
    public updateHead({ hid }: { hid: number }) {
        this.hid = hid;
        this.renderHead(this.hid);
    }
}
