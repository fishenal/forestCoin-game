import { Container, Graphics, Sprite } from 'pixi.js';
import gsap from 'gsap';
import { CircleButton } from '../ui/CircleButton';
import { navigation } from '../navigation';
import StartScreen from '../screen/StartScreen';
import { sfx } from '../utils/audio';

export class SettingPopup extends Container {
    public static SCREEN_ID = 'settingPopup';
    public _width!: number;
    public _height!: number;
    private container: Graphics;
    private blackMask: Graphics;
    private content: Container;
    constructor() {
        super();
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this.container = new Graphics();
        this.blackMask = new Graphics();
        this.content = new Container();
        this.content.zIndex = 3;
        this.removeChildren();
        this.renderBackground();
        this.renderContent();
        this.renderBlackMask();
    }
    public async show() {
        sfx.play('audio/swing.wav');
        gsap.to(this.container, {
            y: this._height * 0.5,
            ease: 'power2.inOut',
        });
    }
    public async hide() {
        gsap.to(this.container, {
            y: -999,
            ease: 'power2.inOut',
        });
    }
    renderBlackMask() {
        this.blackMask.rect(0, 0, this._width, this._height);
        this.blackMask.fill(0x000000);
        this.blackMask.alpha = 0.5;
        this.blackMask.x = 0;
        this.blackMask.y = 0;

        this.blackMask.zIndex = 1;
        this.addChild(this.blackMask);
    }

    renderBackground() {
        // this.container.rect(0, 0, this._width * 0.5, this._height * 0.5);
        // this.container.fill(0xd6ad98);
        // this.container.stroke({
        //     width: 2,
        //     color: 0x301f23,
        // });
        this.container.x = this._width * 0.5;
        // this.container.y = this._height * 0.5;
        this.container.pivot.x = this._width * 0.5 * 0.5;
        this.container.pivot.y = this._height * 0.5 * 0.5;
        this.container.zIndex = 2;
        this.addChild(this.container);
    }

    renderContent() {
        const buttonHome = new CircleButton({
            size: 40,
            icon: Sprite.from('Icon_Home'),
            onPress: () => {
                navigation.goToScreen(StartScreen);
                navigation.hideOverlay();
            },
        });
        buttonHome.x = 0;
        this.content.addChild(buttonHome);
        const voiceButton = new CircleButton({
            size: 40,
            icon: Sprite.from('Icon_SoundOff'),
            onPress: () => {
                console.log('on press');
            },
        });
        voiceButton.x = 200;
        this.content.addChild(voiceButton);
        // const star = new Stars(2, 60);
        // star.show();
        // star.y = 40;
        // star.x = 20;
        // this.content.addChild(star);
        // const icon = Sprite.from('Icon_Ghost');
        // icon.width = 120;
        // icon.height = 120;
        // icon.y = 130;
        // icon.x = 60;
        // this.content.addChild(icon);

        // this.buttonArr.forEach((item, idx) => {
        //     const button = new FancyButton({
        //         defaultView: Sprite.from(item.spriteName),
        //         ...buttonAnimation,
        //     });
        //     button.width = 60;
        //     button.height = 60;
        //     button.onPress.connect(item.action);
        //     button.x = idx * 150;
        //     button.y = this._height * 0.5 * 0.8;
        //     this.content.addChild(button);
        // });
        // this.content.width = this._width * 0.5 * 0.5;
        this.content.x = this._width * 0.5 * 0.5;
        this.content.pivot.x = this.content.width * 0.5;
        this.content.y = this._height * 0.5;
        this.content.pivot.y = this._height * 0.5;

        this.container.addChild(this.content);
    }

    resize(w: number, h: number) {
        this._width = w;
        this._height = h;
        console.log('run in resize');
    }
}
