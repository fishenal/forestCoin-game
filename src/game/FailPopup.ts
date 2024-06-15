import { Container, Sprite } from 'pixi.js';
import { Stars } from '../components/Stars';
import { CircleButton } from '../ui/CircleButton';
import { navigation } from '../navigation';
import StartScreen from '../screen/StartScreen';
import GameScreen from '../screen/GameScreen';
import { gameStatus } from './GameStatus';
import { countdownline } from './Countdownline';
import { CommonPopup } from '../ui/CommonPopup';
import gsap from 'gsap';
interface ButtonItem {
    name: string;
    spriteName: string;
    action: () => void;
}
type failType = 'timeout' | 'packageLimit';
export class FailPopup extends CommonPopup {
    public static SCREEN_ID = 'failPopup';
    private buttonArr: ButtonItem[];
    private type: failType;
    constructor() {
        super();
        this.type = 'timeout';
        this.buttonArr = [
            {
                name: 'menu',
                spriteName: 'Icon_Home',
                action: this.onBackMenu,
            },
            {
                name: 'restart',
                spriteName: 'Icon_Restart',
                action: this.onRestart,
            },
        ];
    }
    public prepare(data: { type: failType }) {
        this.type = data.type;
    }

    public async show() {
        countdownline.stopCount();
        gameStatus.setStatus('end');
        this.renderFailPop();
        super.show();
    }
    public async hide() {
        gameStatus.setStatus('normal');
        super.hide();
    }

    renderFailPop() {
        this.content.removeChildren();
        const failPopup = new Container();
        const star = new Stars(0, 60);
        star.show();
        star.y = 40;
        star.x = 20;
        failPopup.addChild(star);
        const icon = this.type === 'packageLimit' ? Sprite.from('Icon_Skull') : Sprite.from('Icon_Clock');
        icon.width = 120;
        icon.height = 120;
        icon.anchor = 0.5;
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
        failPopup.addChild(icon);

        this.buttonArr.forEach((item, idx) => {
            const button = new CircleButton({
                size: 40,
                onPress: item.action,
                icon: Sprite.from(item.spriteName),
            });
            button.x = idx * 200;
            button.y = 300;
            failPopup.addChild(button);
        });

        failPopup.pivot.x = failPopup.width * 0.5;
        this.content.addChild(failPopup);
    }

    onBackMenu() {
        navigation.hideOverlay();
        navigation.goToScreen(StartScreen);
    }
    onRestart() {
        navigation.hideOverlay();
        navigation.goToScreen(GameScreen);
    }
    resize(w: number, h: number) {
        this._width = w;
        this._height = h;
    }
}
