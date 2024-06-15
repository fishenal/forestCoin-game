import { Container, Graphics } from 'pixi.js';
import gsap from 'gsap';
import { sfx } from '../utils/audio';

export class CommonPopup extends Container {
    public static SCREEN_ID = 'popup';
    public _width!: number;
    public _height!: number;
    private blackMask: Graphics;
    public content: Container;
    public onMaskClick?: () => void;
    constructor() {
        super();
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this.blackMask = new Graphics();
        this.blackMask.zIndex = 1;
        this.addChild(this.blackMask);
        this.content = new Container();
        this.content.zIndex = 3;
    }
    public async show() {
        this.renderBlackMask();
        this.renderContent();
        sfx.play('audio/swing.wav');
        gsap.to(this.content, {
            y: (this._height / 3) * 0.5,
            ease: 'power2.inOut',
        });
    }
    public async hide() {
        gsap.to(this.content, {
            y: -9999,
            ease: 'power2.inOut',
        });
    }
    renderBlackMask() {
        this.blackMask.clear();
        this.blackMask.rect(0, 0, this._width, this._height);
        this.blackMask.fill(0x000000);
        this.blackMask.alpha = 0.5;
        this.blackMask.x = 0;
        this.blackMask.y = 0;
        if (this.onMaskClick) {
            this.blackMask.eventMode = 'static';
            this.blackMask.on('pointerdown', this.onMaskClick);
        }
    }

    renderContent() {
        this.removeChild(this.content);
        this.content.x = this._width * 0.5;
        this.content.zIndex = 2;
        this.addChild(this.content);
    }

    resize(w: number, h: number) {
        this._width = w;
        this._height = h;
    }
}
