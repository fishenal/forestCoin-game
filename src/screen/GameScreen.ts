import { Container } from 'pixi.js';
import { workLine } from '../game/Workline';
import { gameBoard } from '../game/GameBoard';
import { designConfig } from '../utils/designConfig';
import { countdownline } from '../game/Countdownline';
import { toolbarline } from '../game/Toolbarline';
import { bgm } from '../utils/audio';
import { SettingIcon } from '../components/SettingIcon';
import { Background } from '../components/Background';
import { setup } from '../game/Setup';
import { IndicatorCover } from './IndicatorCover';
import { navigation } from '../navigation';

const innerWidth = designConfig.content.innerWidth;
class GameScreen extends Container {
    public static SCREEN_ID = 'gameScreen';
    public static assetBundles = ['imgAssets', 'default'];
    private innerContainer: Container;
    private settingIcon: SettingIcon;
    private bg: Background;
    constructor() {
        super();

        this.bg = new Background();
        this.addChild(this.bg);
        this.innerContainer = new Container();
        this.innerContainer.width = innerWidth;
        this.innerContainer.addChild(gameBoard);

        this.innerContainer.addChild(workLine);
        this.innerContainer.addChild(countdownline);
        this.innerContainer.addChild(toolbarline);
        this.settingIcon = new SettingIcon();

        this.innerContainer.addChild(this.settingIcon);
        this.addChild(this.innerContainer);
    }
    public async show() {
        await gameBoard.show();
        await workLine.show();
        await countdownline.show();
        await toolbarline.show();
        bgm.play('audio/bird_bg.wav');
        const { innerWidth } = setup.getConfigData();
        this.settingIcon.x = innerWidth + 40;
        this.settingIcon.y = innerWidth * 1.2;

        navigation.showOverlay(IndicatorCover, {
            showTool: false,
        });
    }

    public async hide() {}
    resize(w: number, h: number) {
        this.bg.resize(w, h);
        this.innerContainer.x = w * 0.5 - innerWidth * 0.5;
    }
}

export default GameScreen;
