import { Container } from 'pixi.js';
import { workLine } from '../game/Workline';
import { gameBoard } from '../game/GameBoard';
import { gold } from '../game/Gold';
import { tool } from '../game/Tool';
import { background } from '../components/Background';
import { designConfig } from '../utils/designConfig';

const innerWidth = designConfig.sixContent.width;
class GameScreen extends Container {
    public static SCREEN_ID = 'gameScreen';
    public static assetBundles = ['imgAssets'];
    private innerContainer: Container;
    constructor() {
        super();
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
        // this.innerContainer.addChild(tool);
        this.addChild(background);
        this.addChild(this.innerContainer);

        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
    }
    public async show() {
        await gameBoard.show();
        await workLine.show();
        // tool.show();
        await background.show();
        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
        this.innerContainer.x = window.innerWidth * 0.5 - this.innerContainer.width * 0.5;
        this.innerContainer.y = 60;
    }

    // private handleHeadClick(hid: number) {
    //     // console.log('🚀 ~ GameScreen ~ handleHeadClick ~ cidx:', cidx);
    //     this.workLine.addHid(hid);
    //     this.gold.addCoin(1);
    //     // this.game.pushToWorkline(hid);
    //     // this.game.gameBoard[ridx];
    //     // this.showWorkline();
    // }
    resize(w: number, h: number) {
        background.resize(w, h);
        this.innerContainer.x = w * 0.5 - this.innerContainer.width * 0.5;
        this.innerContainer.y = 60;
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
    update() {
        //this.width
        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
        // console.log('🚀 ~ GameScreen ~ update ~ this.game.worklineContainer:', this.game.worklineContainer);
        // this.addChild(this.game.worklineContainer);
        // this.game.worklineContainer.show();
    }
}

export default GameScreen;
