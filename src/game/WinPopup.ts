import { Container, Sprite } from 'pixi.js';
import { Stars } from '../components/Stars';
import { sfx } from '../utils/audio';
import { gameStatus } from './GameStatus';
import { navigation } from '../navigation';
import StartScreen from '../screen/StartScreen';
import GameScreen from '../screen/GameScreen';
import { setup } from './Setup';
import { CircleButton } from '../ui/CircleButton';
import { emitter } from '../store/emitter';
import { countdownline } from './Countdownline';
import { toolbarline } from './Toolbarline';
import { CommonPopup } from '../ui/CommonPopup';
import gsap from 'gsap';
interface ButtonItem {
    name: string;
    spriteName: string;
    action: () => void;
    isShow: boolean;
}
export class WinPopup extends CommonPopup {
    public static SCREEN_ID = 'winPopup';
    private buttonArr: ButtonItem[];
    private isLastLevel: boolean;
    private star: number;
    constructor() {
        super();
        this.star = 0;
        this.isLastLevel = false;
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
    }
    updateStar() {
        const { countSec } = setup.getConfigData();

        let star = 3;
        if (countSec / 2 > countdownline.second) {
            star -= 1;
        }
        if (toolbarline.used) {
            star -= 1;
        }
        emitter.emit('onWin', star);
        this.star = star;
    }
    public async show() {
        if (setup.currentLevel >= setup.levelCount) {
            this.buttonArr[1].isShow = false;
            this.isLastLevel = true;
        } else {
            this.isLastLevel = false;
            this.buttonArr[1].isShow = true;
        }
        this.updateStar();
        countdownline.stopCount();
        sfx.play('audio/win.wav');
        gameStatus.setStatus('end');
        this.renderWinPop();
        super.show();
    }
    public async hide() {
        gameStatus.setStatus('normal');
        super.hide();
    }

    renderWinPop() {
        this.content.removeChildren();
        const winPop = new Container();

        const star = new Stars(this.star, 60);
        star.show();
        star.y = 40;
        star.x = 20;
        winPop.addChild(star);
        const icon = Sprite.from('Icon_Crown');
        icon.width = 120;
        icon.height = 120;
        icon.y = 130;
        icon.x = 60;
        gsap.fromTo(
            icon,
            {
                x: '-=2',
                yoyo: true,
                yoyoEase: 'power2',
                repeat: -1,
                duration: 0.1,
            },
            {
                x: '+=4',
                yoyo: true,
                yoyoEase: 'power2',
                repeat: -1,
                duration: 0.1,
            },
        );
        winPop.addChild(icon);

        this.buttonArr.forEach((item, idx) => {
            if (!item.isShow) {
                return;
            }
            const button = new CircleButton({
                size: 40,
                onPress: item.action,
                icon: Sprite.from(item.spriteName),
            });
            button.x = this.isLastLevel ? 100 : idx * 200;
            button.y = 300;
            winPop.addChild(button);
        });
        winPop.pivot.x = winPop.width * 0.5;
        this.content.addChild(winPop);
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
