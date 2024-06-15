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

interface ButtonItem {
    name: string;
    spriteName: string;
    action: () => void;
    isShow: boolean;
}
export class WinPopup extends CommonPopup {
    public static SCREEN_ID = 'winPopup';
    private buttonArr: ButtonItem[];
    private star: number;
    constructor() {
        super();
        this.star = 0;

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
        this.renderWinPop();
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
        sfx.play('audio/win.wav');
        gameStatus.setStatus('end');
        super.show();
    }
    public async hide() {
        gameStatus.setStatus('normal');
        super.hide();
    }

    renderWinPop() {
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
            button.x = idx * 200;
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
