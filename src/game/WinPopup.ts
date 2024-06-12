import { Container, Graphics, Sprite } from 'pixi.js';
import { Stars } from '../components/Stars';
import gsap from 'gsap';
import { bgm, sfx } from '../utils/audio';
import { gameStatus } from './GameStatus';
import { navigation } from '../navigation';
import StartScreen from '../screen/StartScreen';
import GameScreen from '../screen/GameScreen';
import { setup } from './Setup';
import { gameRecord } from './GameRecord';
import { CircleButton } from '../ui/CircleButton';
import { emitter } from '../store/emitter';
import { countdownline } from './Countdownline';
import { toolbarline } from './Toolbarline';

interface ButtonItem {
    name: string;
    spriteName: string;
    action: () => void;
    isShow: boolean;
}
export class WinPopup extends Container {
    public static SCREEN_ID = 'winPopup';
    public _width!: number;
    public _height!: number;
    private container: Graphics;
    private blackMask: Graphics;
    private content: Container;
    private buttonArr: ButtonItem[];
    private star: number;
    constructor() {
        super();
        this.star = 0;
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this.container = new Graphics();
        this.blackMask = new Graphics();
        this.content = new Container();
        this.content.zIndex = 3;
        this.buttonArr = [
            {
                name: 'menu',
                spriteName: 'Icon_Home',
                isShow: true,
                action: this.onBackMenu,
            },
            {
                name: 'next',
                spriteName: 'Icon_ArrowRight',
                isShow: true,
                action: this.onNext,
            },
        ];
        this.renderBackground();
        this.container.addChild(this.content);
        this.renderBlackMask();
    }
    public async show() {
        if (setup.currentLevel >= setup.levelCount) {
            this.buttonArr[1].isShow = false;
        }

        const { countSec } = setup.getConfigData();

        let star = 3;
        if (countSec / 2 > countdownline.second) {
            star -= 1;
        }
        if (toolbarline.used) {
            star -= 1;
        }
        countdownline.stopCount();
        this.star = star;

        emitter.emit('onWin', star);
        this.content.removeChildren();
        this.renderContent();
        sfx.play('audio/win.wav');
        gameStatus.setStatus('end');
        // // gameRecord.setGameLevel(setup.currentLevel, 3, false);
        // setup.currentLevel += 1;
        sfx.play('audio/swing.wav');
        gsap.to(this.container, {
            y: this._height * 0.5,
            ease: 'power2.inOut',
        });
    }
    public async hide() {
        gameStatus.setStatus('normal');
        gsap.to(this.container, {
            y: -999,
            ease: 'power2.inOut',
        });
    }
    renderBlackMask() {
        this.blackMask.rect(0, 0, this._width, this._height);
        this.blackMask.fill(0x000000);
        this.blackMask.alpha = 0.8;
        this.blackMask.x = 0;
        this.blackMask.y = 0;

        this.blackMask.zIndex = 1;
        this.addChild(this.blackMask);
    }

    renderBackground() {
        // this.container.roundRect(0, 0, this._width * 0.5, this._height * 0.5);
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
        const star = new Stars(this.star, 60);
        star.show();
        star.y = 40;
        star.x = 20;
        this.content.addChild(star);
        const icon = Sprite.from('Icon_Crown');
        icon.width = 120;
        icon.height = 120;
        icon.y = 130;
        icon.x = 60;
        this.content.addChild(icon);

        this.buttonArr.forEach((item, idx) => {
            if (!item.isShow) {
                return;
            }
            const button = new CircleButton({
                size: 40,
                onPress: item.action,
                icon: Sprite.from(item.spriteName),
            });
            button.x = idx * 200;
            button.y = this._height * 0.5 * 0.8;
            this.content.addChild(button);
        });
        // this.content.width = this._width * 0.5 * 0.5;
        this.content.x = this._width * 0.5 * 0.5;
        this.content.pivot.x = this.content.width * 0.5;
        this.content.y = this._height * 0.5;
        this.content.pivot.y = this._height * 0.5;
    }

    onBackMenu() {
        navigation.hideOverlay();
        navigation.goToScreen(StartScreen);
    }
    onNext() {
        if (setup.currentLevel >= setup.levelCount) {
            return;
        }
        setup.currentLevel += 1;
        navigation.hideOverlay();
        navigation.goToScreen(GameScreen);
    }
    resize(w: number, h: number) {
        this._width = w;
        this._height = h;
    }
}
