import { Container } from 'pixi.js';
import { workLine } from '../game/Workline';
import { gameBoard } from '../game/GameBoard';
// import { background } from '../components/Background';
import { designConfig } from '../utils/designConfig';
import { countdownline } from '../game/Countdownline';
import { toolbarline } from '../game/Toolbarline';
import { bgm } from '../utils/audio';
import { SettingIcon } from '../components/SettingIcon';
import { Background } from '../components/Background';

const innerWidth = designConfig.sixContent.width;
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
        // this.gold = gold;

        // this.gameBoard = gameBoard;
        // this.gameBoard.onHeadClick = (hid: number) => {
        //     this.handleHeadClick(hid);
        // };
        // this.gameBoard.onClearCol = () => {
        //     this.gold.addCoin(5);
        // };
        // this.innerContainer.addChild(gold);
        this.innerContainer.addChild(gameBoard);

        // this.workLine = workLine;
        // this.workLine.onThreeRemove = () => {
        //     this.gold.addCoin(3);
        // };
        this.innerContainer.addChild(workLine);
        this.innerContainer.addChild(countdownline);
        this.innerContainer.addChild(toolbarline);
        this.settingIcon = new SettingIcon();
        this.settingIcon.x = 610;
        this.settingIcon.y = 680;
        this.innerContainer.addChild(this.settingIcon);

        // this.innerContainer.addChild(tool);

        // this.addChild(failPopup);
        this.addChild(this.innerContainer);

        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
    }
    public async show() {
        await gameBoard.show();
        await workLine.show();
        // const background = new Background();
        // this.addChild(background);
        // tool.show();
        // await background.show();
        await countdownline.show();
        await toolbarline.show();

        this.settingIcon.show();
        bgm.play('audio/bird_bg.wav');
        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
        // this.innerContainer.x = window.innerWidth * 0.5 - this.innerContainer.width * 0.5;
        // this.innerContainer.y = 20;
    }

    public async hide() {}
    // private handleHeadClick(hid: number) {
    //     // console.log('🚀 ~ GameScreen ~ handleHeadClick ~ cidx:', cidx);
    //     this.workLine.addHid(hid);
    //     this.gold.addCoin(1);
    //     // this.game.pushToWorkline(hid);
    //     // this.game.gameBoard[ridx];
    //     // this.showWorkline();
    // }
    resize(w: number, h: number) {
        this.bg.resize(w, h);
        this.innerContainer.x = w * 0.5 - innerWidth * 0.5;
        this.innerContainer.y = 20;
        // console.log('🚀 ~ GameScreen ~ resize ~ w:', w);
        // this.width = 400;
        // this.height = h;
        // console.log(this.width);
        // this.gameContainerPosition.x = w * 0.5;
        // this.gameContainerPosition.y = 0;
        // this.x = this.gameContainerPosition.x;
        // this.y = this.gameContainerPosition.y;
        // this.x = w / 2;
        // this.pivot.x = w / 2;
        // // this.x = w / 2;
        // this.x = w / 4;
        // this.y = 20;
    }
}

export default GameScreen;
